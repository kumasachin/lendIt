import { useState, useEffect, useCallback } from "react";
import {
  getInterestRate,
  calculateMonthlyPayment,
} from "../utils/calculations";
import {
  saveLoanState,
  loadLoanState,
  submitQuote,
  withRetry,
  ApiError,
  ApiErrorType,
} from "../api/loanApi";
import type { LoanConfig, LoanState } from "../config/loanConfig";

export interface QuoteResponse {
  success: boolean;
  quoteId?: string;
  message: string;
  estimatedProcessingTime?: number;
}

export interface UseLoanCalculatorReturn {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  hasQuoted: boolean;
  isLoading: boolean;
  error: string | null;
  isSubmittingQuote: boolean;
  quoteResponse: QuoteResponse | null;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuote: () => Promise<void>;
  clearError: () => void;
  retryQuote: () => Promise<void>;
}

export const useLoanCalculator = (
  config: LoanConfig
): UseLoanCalculatorReturn => {
  const [loanAmount, setLoanAmount] = useState(config.loanAmount.default);
  const [loanTerm, setLoanTerm] = useState(config.loanTerm.default);
  const [hasQuoted, setHasQuoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(
    null
  );

  const interestRate = getInterestRate(loanAmount, config);
  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    interestRate,
    loanTerm / 12
  );

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadLoanState();
    if (savedState && !config.resetOnQuote) {
      setLoanAmount(savedState.loanAmount);
      setLoanTerm(savedState.loanTerm);
      setHasQuoted(savedState.hasQuoted || false);
    }
  }, [config.resetOnQuote]);

  // Save state changes
  useEffect(() => {
    const state: LoanState = {
      loanAmount,
      loanTerm,
      hasQuoted,
    };

    const saveState = async () => {
      try {
        await saveLoanState(state);
      } catch (error) {
        console.warn("Failed to save state:", error);
      }
    };

    // Debounce saves
    const timeoutId = setTimeout(saveState, 500);
    return () => clearTimeout(timeoutId);
  }, [loanAmount, loanTerm, hasQuoted]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setLoanAmount(value);
      clearError();
    },
    [clearError]
  );

  const handleTermChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setLoanTerm(value);
      clearError();
    },
    [clearError]
  );

  const submitQuoteWithRetry = useCallback(async () => {
    const state: LoanState = {
      loanAmount,
      loanTerm,
      hasQuoted: false,
    };

    return await withRetry(
      () => submitQuote(state),
      3, // Max 3 retries
      1000 // 1 second base delay
    );
  }, [loanAmount, loanTerm]);

  const handleQuote = useCallback(async () => {
    if (hasQuoted || isSubmittingQuote) return;

    setIsSubmittingQuote(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await submitQuoteWithRetry();

      setQuoteResponse(response);
      setHasQuoted(true);

      // If config says to reset after quote, don't persist the quoted state
      if (!config.resetOnQuote) {
        const updatedState: LoanState = {
          loanAmount,
          loanTerm,
          hasQuoted: true,
        };
        await saveLoanState(updatedState);
      }
    } catch (error) {
      console.error("Quote submission failed:", error);

      if (error instanceof ApiError) {
        switch (error.type) {
          case ApiErrorType.NETWORK_ERROR:
            setError(
              "Network error. Please check your connection and try again."
            );
            break;
          case ApiErrorType.SERVER_ERROR:
            setError(
              "Server error. Our team has been notified. Please try again later."
            );
            break;
          case ApiErrorType.VALIDATION_ERROR:
            setError(error.message);
            break;
          case ApiErrorType.TIMEOUT_ERROR:
            setError("Request timed out. Please try again.");
            break;
          case ApiErrorType.RATE_LIMIT_ERROR: {
            const retryAfter = error.retryAfter || 60;
            setError(
              `Too many requests. Please wait ${retryAfter} seconds before trying again.`
            );
            break;
          }
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setIsSubmittingQuote(false);
    }
  }, [
    hasQuoted,
    isSubmittingQuote,
    loanAmount,
    loanTerm,
    config.resetOnQuote,
    submitQuoteWithRetry,
  ]);

  const retryQuote = useCallback(async () => {
    if (!error) return;
    await handleQuote();
  }, [error, handleQuote]);

  return {
    loanAmount,
    loanTerm,
    interestRate,
    monthlyPayment,
    hasQuoted,
    isLoading,
    error,
    isSubmittingQuote,
    quoteResponse,
    handleAmountChange,
    handleTermChange,
    handleQuote,
    clearError,
    retryQuote,
  };
};

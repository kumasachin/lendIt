import React, { useState, useEffect } from "react";
import {
  AppContainer,
  CalculatorCard,
  LoanAmountSection,
  LoanAmountLabel,
  LoanAmountValue,
  LoanTermSection,
  LoanTermLabel,
  SliderContainer,
  Slider,
  ResultsSection,
  ResultItem,
  ResultLabel,
  ResultValue,
  ButtonContainer,
  GetQuoteButton,
  LoadingSpinner,
  VisuallyHidden,
  ErrorContainer,
  ErrorMessage,
  ErrorActions,
  RetryButton,
  DismissButton,
  SuccessContainer,
  SuccessMessage,
  SuccessDetails,
} from "./StyledComponents";
import { formatCurrency, formatYears } from "../utils/calculations";
import { useLoanCalculator } from "../hooks/useLoanCalculator";
import { getLoanConfig } from "../api/loanApi";
import { TEST_IDS, DEFAULT_CONFIG } from "../config/loanConfig";
import type { LoanConfig } from "../config/loanConfig";

const LoanCalculator: React.FC = () => {
  const [config, setConfig] = useState<LoanConfig>(DEFAULT_CONFIG);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  const {
    loanAmount,
    loanTerm,
    handleAmountChange,
    handleTermChange,
    handleQuote,
    interestRate,
    monthlyPayment,
    hasQuoted,
    isLoading,
    error,
    isSubmittingQuote,
    quoteResponse,
    clearError,
    retryQuote,
  } = useLoanCalculator(config);

  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const fetchedConfig = await getLoanConfig();
        setConfig(fetchedConfig);
      } catch (error) {
        console.error("Failed to load configuration:", error);
        // Continue with default config
      } finally {
        setIsConfigLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (isConfigLoading) {
    return (
      <AppContainer>
        <CalculatorCard data-testid={TEST_IDS.calculatorCard}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <LoadingSpinner />
            Loading calculator...
          </div>
        </CalculatorCard>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <CalculatorCard
        role="region"
        aria-labelledby="calculator-title"
        data-testid={TEST_IDS.calculatorCard}
      >
        <VisuallyHidden>
          <h1 id="calculator-title">Loan Calculator</h1>
        </VisuallyHidden>

        <LoanAmountSection>
          <LoanAmountLabel as="label" htmlFor="loan-amount-slider">
            I want to borrow
          </LoanAmountLabel>
          <LoanAmountValue
            aria-live="polite"
            aria-atomic="true"
            id="loan-amount-value"
            data-testid={TEST_IDS.loanAmountValue}
          >
            {formatCurrency(loanAmount, config)}
          </LoanAmountValue>
          <SliderContainer>
            <Slider
              id="loan-amount-slider"
              type="range"
              min={config.loanAmount.min}
              max={config.loanAmount.max}
              step={config.loanAmount.step}
              value={loanAmount}
              onChange={handleAmountChange}
              data-testid={TEST_IDS.loanAmountSlider}
              aria-describedby="loan-amount-value loan-amount-help"
              aria-label={`Loan amount: ${formatCurrency(loanAmount, config)}`}
            />
            <VisuallyHidden id="loan-amount-help">
              Use arrow keys or drag to adjust loan amount between{" "}
              {formatCurrency(config.loanAmount.min, config)} and{" "}
              {formatCurrency(config.loanAmount.max, config)} in steps of{" "}
              {formatCurrency(config.loanAmount.step, config)}
            </VisuallyHidden>
          </SliderContainer>
        </LoanAmountSection>

        <LoanTermSection>
          <LoanTermLabel
            as="label"
            htmlFor="loan-term-slider"
            data-testid={TEST_IDS.loanTermValue}
          >
            over {formatYears(loanTerm)}
          </LoanTermLabel>
          <SliderContainer>
            <Slider
              id="loan-term-slider"
              type="range"
              min={config.loanTerm.min}
              max={config.loanTerm.max}
              step={config.loanTerm.step}
              value={loanTerm}
              onChange={handleTermChange}
              data-testid={TEST_IDS.loanTermSlider}
              aria-describedby="loan-term-help"
              aria-label={`Loan term: ${formatYears(loanTerm)}`}
            />
            <VisuallyHidden id="loan-term-help">
              Use arrow keys or drag to adjust loan term between{" "}
              {config.loanTerm.min} and {config.loanTerm.max} years in{" "}
              {config.loanTerm.step} year increments
            </VisuallyHidden>
          </SliderContainer>
        </LoanTermSection>

        <ResultsSection role="region" aria-labelledby="results-title">
          <VisuallyHidden>
            <h2 id="results-title">Loan Calculation Results</h2>
          </VisuallyHidden>
          <ResultItem>
            <ResultValue
              aria-live="polite"
              aria-atomic="true"
              aria-describedby="interest-rate-label"
              data-testid={TEST_IDS.interestRate}
            >
              {interestRate}%
            </ResultValue>
            <ResultLabel id="interest-rate-label">Interest rate</ResultLabel>
          </ResultItem>
          <ResultItem>
            <ResultValue
              aria-live="polite"
              aria-atomic="true"
              aria-describedby="monthly-payment-label"
              data-testid={TEST_IDS.monthlyPayment}
            >
              {formatCurrency(monthlyPayment, config)}
            </ResultValue>
            <ResultLabel id="monthly-payment-label">
              Monthly repayment
            </ResultLabel>
          </ResultItem>
        </ResultsSection>

        {/* Error Display */}
        {error && (
          <ErrorContainer role="alert" aria-live="assertive">
            <ErrorMessage>{error}</ErrorMessage>
            <ErrorActions>
              <RetryButton
                onClick={retryQuote}
                disabled={isSubmittingQuote}
                aria-label="Retry quote submission"
              >
                {isSubmittingQuote ? <LoadingSpinner /> : null}
                Try Again
              </RetryButton>
              <DismissButton
                onClick={clearError}
                aria-label="Dismiss error message"
              >
                Dismiss
              </DismissButton>
            </ErrorActions>
          </ErrorContainer>
        )}

        {/* Success Display */}
        {quoteResponse && quoteResponse.success && (
          <SuccessContainer role="status" aria-live="polite">
            <SuccessMessage>Quote Submitted Successfully!</SuccessMessage>
            <SuccessDetails>
              {quoteResponse.message}
              {quoteResponse.quoteId && (
                <>
                  <br />
                  Quote ID: {quoteResponse.quoteId}
                </>
              )}
            </SuccessDetails>
          </SuccessContainer>
        )}

        <ButtonContainer>
          <GetQuoteButton
            type="button"
            aria-describedby="quote-description"
            onClick={handleQuote}
            disabled={isLoading || hasQuoted || isSubmittingQuote}
            data-testid={TEST_IDS.getQuoteButton}
          >
            {(isLoading || isSubmittingQuote) && <LoadingSpinner />}
            {hasQuoted ? "Quote Submitted!" : "Get your quote »"}
          </GetQuoteButton>
        </ButtonContainer>

        <VisuallyHidden id="quote-description">
          Get a personalized loan quote based on your selected amount of{" "}
          {formatCurrency(loanAmount, config)} over {formatYears(loanTerm)} at{" "}
          {interestRate}% interest rate
        </VisuallyHidden>
      </CalculatorCard>
    </AppContainer>
  );
};

export default LoanCalculator;

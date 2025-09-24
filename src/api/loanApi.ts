import type { LoanConfig, LoanState } from "../config/loanConfig";
import { DEFAULT_CONFIG } from "../config/loanConfig";

// API Error types
export const ApiErrorType = {
  NETWORK_ERROR: "NETWORK_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
} as const;

export type ApiErrorType = (typeof ApiErrorType)[keyof typeof ApiErrorType];

export class ApiError extends Error {
  public type: ApiErrorType;
  public code?: string;
  public retryAfter?: number;

  constructor(
    type: ApiErrorType,
    message: string,
    code?: string,
    retryAfter?: number
  ) {
    super(message);
    this.name = "ApiError";
    this.type = type;
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

// Quote submission response
export interface QuoteResponse {
  success: boolean;
  quoteId?: string;
  message: string;
  estimatedProcessingTime?: number;
}

// API configuration for error simulation
const API_CONFIG = {
  configFailureRate: 0.05, // 5% failure rate for config loading
  quoteFailureRate: 0.15, // 15% failure rate for quote submission
  networkDelay: { min: 200, max: 1000 }, // Variable network delay
  enableRateLimiting: true,
  maxRequestsPerMinute: 10,
};

// Rate limiting store
const rateLimitStore = {
  requests: [] as number[],
  isRateLimited(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Clean old requests
    this.requests = this.requests.filter((time) => time > oneMinuteAgo);

    if (this.requests.length >= API_CONFIG.maxRequestsPerMinute) {
      return true;
    }

    this.requests.push(now);
    return false;
  },
};

// Simulate network delay with random variation
const delay = (ms?: number) => {
  const delayTime =
    ms ||
    Math.random() *
      (API_CONFIG.networkDelay.max - API_CONFIG.networkDelay.min) +
      API_CONFIG.networkDelay.min;
  return new Promise((resolve) => setTimeout(resolve, delayTime));
};

// Simulate different types of API errors
const simulateError = (failureRate: number): ApiError | null => {
  if (Math.random() > failureRate) return null;

  const errorTypes = [
    {
      type: ApiErrorType.NETWORK_ERROR,
      message:
        "Network connection failed. Please check your internet connection.",
      weight: 0.3,
    },
    {
      type: ApiErrorType.SERVER_ERROR,
      message: "Server is temporarily unavailable. Please try again later.",
      code: "SERVER_500",
      weight: 0.25,
    },
    {
      type: ApiErrorType.TIMEOUT_ERROR,
      message: "Request timed out. Please try again.",
      weight: 0.2,
    },
    {
      type: ApiErrorType.VALIDATION_ERROR,
      message: "Invalid request data. Please refresh the page and try again.",
      code: "VALIDATION_400",
      weight: 0.15,
    },
    {
      type: ApiErrorType.RATE_LIMIT_ERROR,
      message: "Too many requests. Please wait before trying again.",
      code: "RATE_LIMIT_429",
      retryAfter: 60,
      weight: 0.1,
    },
  ];

  // Weighted random selection
  const random = Math.random();
  let accumulator = 0;

  for (const error of errorTypes) {
    accumulator += error.weight;
    if (random <= accumulator) {
      return new ApiError(
        error.type,
        error.message,
        error.code,
        error.retryAfter
      );
    }
  }

  return (
    errorTypes[0] && new ApiError(errorTypes[0].type, errorTypes[0].message)
  );
};

// Check rate limiting
const checkRateLimit = (): void => {
  if (API_CONFIG.enableRateLimiting && rateLimitStore.isRateLimited()) {
    throw new ApiError(
      ApiErrorType.RATE_LIMIT_ERROR,
      "Rate limit exceeded. Please wait before making more requests.",
      "RATE_LIMIT_429",
      60
    );
  }
};

// Simulate API call to get loan configuration
export const getLoanConfig = async (): Promise<LoanConfig> => {
  await delay();

  checkRateLimit();

  const error = simulateError(API_CONFIG.configFailureRate);
  if (error) {
    throw error;
  }

  return DEFAULT_CONFIG;
};

// Submit quote with comprehensive error handling
export const submitQuote = async (state: LoanState): Promise<QuoteResponse> => {
  await delay();

  checkRateLimit();

  // Validate input
  if (
    !state.loanAmount ||
    state.loanAmount < 1000 ||
    state.loanAmount > 25000
  ) {
    throw new ApiError(
      ApiErrorType.VALIDATION_ERROR,
      "Loan amount must be between £1,000 and £25,000",
      "VALIDATION_AMOUNT"
    );
  }

  if (!state.loanTerm || state.loanTerm < 12 || state.loanTerm > 60) {
    throw new ApiError(
      ApiErrorType.VALIDATION_ERROR,
      "Loan term must be between 12 and 60 months",
      "VALIDATION_TERM"
    );
  }

  const error = simulateError(API_CONFIG.quoteFailureRate);
  if (error) {
    throw error;
  }

  // Generate mock quote ID
  const quoteId = `QUOTE_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  return {
    success: true,
    quoteId,
    message: "Quote submitted successfully! We'll be in touch within 24 hours.",
    estimatedProcessingTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  };
};

// Save loan state to localStorage (simulating API persistence)
export const saveLoanState = async (state: LoanState): Promise<void> => {
  await delay(100);

  checkRateLimit();

  const error = simulateError(0.02); // 2% failure rate for save operations
  if (error) {
    throw error;
  }

  try {
    localStorage.setItem(
      "loanCalculatorState",
      JSON.stringify({
        ...state,
        savedAt: new Date().toISOString(),
      })
    );
  } catch {
    throw new ApiError(
      ApiErrorType.SERVER_ERROR,
      "Failed to save loan state. Local storage may be full.",
      "STORAGE_ERROR"
    );
  }
};

// Load loan state from localStorage
export const loadLoanState = (): LoanState | null => {
  try {
    const saved = localStorage.getItem("loanCalculatorState");
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    // Check if saved state is recent (within 7 days)
    if (parsed.savedAt) {
      const savedDate = new Date(parsed.savedAt);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      if (savedDate < sevenDaysAgo) {
        localStorage.removeItem("loanCalculatorState");
        return null;
      }
    }

    return parsed;
  } catch (error) {
    console.warn("Failed to load saved loan state:", error);
    // Clean up corrupted data
    localStorage.removeItem("loanCalculatorState");
    return null;
  }
};

// Clear saved loan state
export const clearLoanState = async (): Promise<void> => {
  await delay(50);

  try {
    localStorage.removeItem("loanCalculatorState");
  } catch {
    throw new ApiError(
      ApiErrorType.SERVER_ERROR,
      "Failed to clear saved state",
      "CLEAR_ERROR"
    );
  }
};

// Health check endpoint
export const healthCheck = async (): Promise<{
  status: string;
  timestamp: string;
}> => {
  await delay(100);

  // 1% chance of service being down
  if (Math.random() < 0.01) {
    throw new ApiError(
      ApiErrorType.SERVER_ERROR,
      "Service is currently unavailable",
      "SERVICE_DOWN"
    );
  }

  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
  };
};

// Retry utility for API calls
export const withRetry = async <T>(
  apiCall: () => Promise<T>,
  maxRetries = 3,
  backoffMs = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on validation errors or rate limits
      if (error instanceof ApiError) {
        if (
          error.type === ApiErrorType.VALIDATION_ERROR ||
          error.type === ApiErrorType.RATE_LIMIT_ERROR
        ) {
          throw error;
        }
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff
      const delayTime = backoffMs * Math.pow(2, attempt);
      await delay(delayTime);
    }
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error("Unknown error occurred during retry attempts");
};

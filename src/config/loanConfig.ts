export interface LoanConfig {
  currency: {
    symbol: string;
    code: string;
    locale: string;
  };
  loanAmount: {
    min: number;
    max: number;
    step: number;
    default: number;
  };
  loanTerm: {
    min: number;
    max: number;
    step: number;
    default: number;
  };
  interestRates: Array<{
    minAmount: number;
    maxAmount: number;
    rate: number;
  }>;
  resetOnQuote: boolean;
}

export interface LoanState {
  loanAmount: number;
  loanTerm: number;
  hasQuoted: boolean;
}

export const DEFAULT_CONFIG: LoanConfig = {
  currency: {
    symbol: "£",
    code: "GBP",
    locale: "en-GB",
  },
  loanAmount: {
    min: 1000,
    max: 20000,
    step: 100,
    default: 7500,
  },
  loanTerm: {
    min: 1,
    max: 5,
    step: 0.5,
    default: 2.5,
  },
  interestRates: [
    { minAmount: 1000, maxAmount: 4999, rate: 7.8 },
    { minAmount: 5000, maxAmount: 9999, rate: 8.5 },
    { minAmount: 10000, maxAmount: 20000, rate: 9.7 },
  ],
  resetOnQuote: true,
};

// Test ID constants
export const TEST_IDS = {
  loanAmountSlider: "loan-amount-slider",
  loanTermSlider: "loan-term-slider",
  loanAmountValue: "loan-amount-value",
  loanTermValue: "loan-term-value",
  interestRate: "interest-rate",
  monthlyPayment: "monthly-payment",
  getQuoteButton: "get-quote-button",
  calculatorCard: "calculator-card",
} as const;

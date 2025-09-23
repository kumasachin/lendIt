import type { LoanConfig } from "../config/loanConfig";

/**
 * Calculate the interest rate based on loan amount and configuration
 */
export const getInterestRate = (amount: number, config: LoanConfig): number => {
  const rate = config.interestRates.find(
    (rateConfig) =>
      amount >= rateConfig.minAmount && amount <= rateConfig.maxAmount
  );

  if (rate) {
    return rate.rate;
  }

  // If amount is below the minimum, use the first rate
  if (amount < config.interestRates[0].minAmount) {
    return config.interestRates[0].rate;
  }

  // If amount is above the maximum, use the last rate
  return config.interestRates[config.interestRates.length - 1].rate;
};

/**
 * Calculate monthly repayment using loan payment formula
 * PMT = P * [r(1 + r)^n] / [(1 + r)^n - 1]
 * Where:
 * P = Principal amount (loan amount)
 * r = Monthly interest rate (annual rate / 12)
 * n = Total number of payments (years * 12)
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    // If no interest, just divide principal by number of payments
    return principal / numberOfPayments;
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Math.round(monthlyPayment);
};

/**
 * Format currency value to display based on configuration
 */
export const formatCurrency = (value: number, config: LoanConfig): string => {
  const formatted = new Intl.NumberFormat(config.currency.locale, {
    style: "currency",
    currency: config.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

  // Replace non-breaking space with regular space for consistency
  return formatted.replace(/\u00A0/g, " ");
};

/**
 * Format years to display properly (e.g., "2½ years")
 * Can accept either months (when > 5) or years (when <= 5)
 */
export const formatYears = (value: number): string => {
  // If the value is greater than 5, assume it's months and convert to years
  const years = value > 5 ? value / 12 : value;

  const wholeYears = Math.floor(years);
  const remainder = Math.round((years - wholeYears) * 4) / 4; // Round to nearest quarter

  if (remainder === 0) {
    return `${wholeYears} ${wholeYears === 1 ? "year" : "years"}`;
  } else if (remainder === 0.5) {
    return `${wholeYears}½ years`;
  } else if (remainder === 0.25) {
    return `${wholeYears}¼ years`;
  } else if (remainder === 0.75) {
    return `${wholeYears}¾ years`;
  } else {
    return `${years} years`;
  }
};

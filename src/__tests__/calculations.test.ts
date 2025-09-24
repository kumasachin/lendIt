import { describe, it, expect } from "vitest";
import {
  getInterestRate,
  calculateMonthlyPayment,
  formatCurrency,
  formatYears,
} from "../utils/calculations";
import { DEFAULT_CONFIG } from "../config/loanConfig";

describe("Loan Calculator Utils", () => {
  describe("getInterestRate", () => {
    it("should return correct interest rates based on config", () => {
      expect(getInterestRate(1000, DEFAULT_CONFIG)).toBe(7.8);
      expect(getInterestRate(2500, DEFAULT_CONFIG)).toBe(7.8);
      expect(getInterestRate(4999, DEFAULT_CONFIG)).toBe(7.8);

      expect(getInterestRate(5000, DEFAULT_CONFIG)).toBe(8.5);
      expect(getInterestRate(7500, DEFAULT_CONFIG)).toBe(8.5);
      expect(getInterestRate(9999, DEFAULT_CONFIG)).toBe(8.5);

      expect(getInterestRate(10000, DEFAULT_CONFIG)).toBe(9.7);
      expect(getInterestRate(15000, DEFAULT_CONFIG)).toBe(9.7);
      expect(getInterestRate(25000, DEFAULT_CONFIG)).toBe(9.7);
    });

    it("should handle edge cases", () => {
      expect(getInterestRate(500, DEFAULT_CONFIG)).toBe(7.8); // Below minimum, should use first rate
      expect(getInterestRate(30000, DEFAULT_CONFIG)).toBe(9.7); // Above maximum, should use last rate
    });
  });

  describe("calculateMonthlyPayment", () => {
    it("should calculate correct monthly payment", () => {
      // Test with £2,500 at 7.8% over 1 year (12 months)
      const result = calculateMonthlyPayment(2500, 7.8, 1);
      expect(Math.round(result)).toBe(217);
    });

    it("should handle different loan terms", () => {
      // Test with £5,000 at 8.5% over 2 years (24 months)
      const result = calculateMonthlyPayment(5000, 8.5, 2);
      expect(result).toBeGreaterThan(220);
      expect(result).toBeLessThan(250);
    });

    it("should handle zero interest rate", () => {
      const result = calculateMonthlyPayment(1200, 0, 1);
      expect(result).toBe(100); // 1200 / 12 months
    });
  });

  describe("formatCurrency", () => {
    it("should format currency correctly with default config", () => {
      expect(formatCurrency(7500, DEFAULT_CONFIG)).toBe("£7,500");
      expect(formatCurrency(1000, DEFAULT_CONFIG)).toBe("£1,000");
      expect(formatCurrency(2500, DEFAULT_CONFIG)).toBe("£2,500");
    });

    it("should handle different currency configurations", () => {
      const euroConfig = {
        ...DEFAULT_CONFIG,
        currency: {
          symbol: "€",
          code: "EUR",
          locale: "de-DE",
        },
      };
      expect(formatCurrency(1000, euroConfig)).toBe("1.000 €");
    });
  });

  describe("formatYears", () => {
    it("should format months as years correctly", () => {
      expect(formatYears(12)).toBe("1 year");
      expect(formatYears(24)).toBe("2 years");
      expect(formatYears(60)).toBe("5 years");
    });

    it("should handle partial years", () => {
      expect(formatYears(18)).toBe("1½ years");
      expect(formatYears(30)).toBe("2½ years");
      expect(formatYears(54)).toBe("4½ years");
    });
  });
});

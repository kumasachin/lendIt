import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoanCalculator from "../components/LoanCalculator";
import { TEST_IDS } from "../config/loanConfig";

// Mock the API
vi.mock("../api/loanApi", () => ({
  getLoanConfig: vi.fn(() =>
    Promise.resolve({
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
        { minAmount: 1000, maxAmount: 7499, rate: 7.8 },
        { minAmount: 7500, maxAmount: 14999, rate: 8.5 },
        { minAmount: 15000, maxAmount: 20000, rate: 9.7 },
      ],
    })
  ),
  saveLoanState: vi.fn(),
  loadLoanState: vi.fn(() => null),
  clearLoanState: vi.fn(),
  submitQuote: vi.fn(() =>
    Promise.resolve({
      success: true,
      quoteId: "QUOTE123",
      message: "Quote submitted successfully!",
    })
  ),
  ApiError: class ApiError extends Error {
    constructor(message: string, type: string) {
      super(message);
      this.type = type;
    }
    type: string;
  },
  ApiErrorType: {
    NETWORK_ERROR: "NETWORK_ERROR",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    SERVER_ERROR: "SERVER_ERROR",
  },
  withRetry: vi.fn((fn) => fn()),
}));

describe("LoanCalculator Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(<LoanCalculator />);
    expect(screen.getByText("Loading calculator...")).toBeInTheDocument();
  });

  it("should render the loan calculator with default values after loading", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText("I want to borrow")).toBeInTheDocument();
    });

    expect(screen.getByText("£7,500")).toBeInTheDocument();
    expect(screen.getByText("over 2½ years")).toBeInTheDocument();
    expect(screen.getByText("8.5%")).toBeInTheDocument();
    expect(screen.getByText("£3,037")).toBeInTheDocument();
  });

  it("should have correct data-testid attributes", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByTestId(TEST_IDS.calculatorCard)).toBeInTheDocument();
    });

    expect(screen.getByTestId(TEST_IDS.loanAmountValue)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.loanAmountSlider)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.loanTermValue)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.loanTermSlider)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.interestRate)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.monthlyPayment)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.getQuoteButton)).toBeInTheDocument();
  });

  it("should update loan amount when slider changes", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText("I want to borrow")).toBeInTheDocument();
    });

    const amountSlider = screen.getByTestId(TEST_IDS.loanAmountSlider);
    fireEvent.change(amountSlider, { target: { value: "5000" } });

    expect(screen.getByText("£5,000")).toBeInTheDocument();
    expect(screen.getByText("7.8%")).toBeInTheDocument(); // Interest rate should change
  });

  it("should update loan term when slider changes", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText("I want to borrow")).toBeInTheDocument();
    });

    const termSlider = screen.getByTestId(TEST_IDS.loanTermSlider);
    fireEvent.change(termSlider, { target: { value: "2" } });

    expect(screen.getByText("over 2 years")).toBeInTheDocument();
  });

  it("should update interest rate based on loan amount", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText("I want to borrow")).toBeInTheDocument();
    });

    const amountSlider = screen.getByTestId(TEST_IDS.loanAmountSlider);

    // Test different interest rate brackets
    fireEvent.change(amountSlider, { target: { value: "3000" } });
    expect(screen.getByText("7.8%")).toBeInTheDocument();

    fireEvent.change(amountSlider, { target: { value: "8000" } });
    expect(screen.getByText("8.5%")).toBeInTheDocument();

    fireEvent.change(amountSlider, { target: { value: "15000" } });
    expect(screen.getByText("9.7%")).toBeInTheDocument();
  });

  it("should have proper slider ranges", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText("I want to borrow")).toBeInTheDocument();
    });

    const amountSlider = screen.getByTestId(TEST_IDS.loanAmountSlider);
    const termSlider = screen.getByTestId(TEST_IDS.loanTermSlider);

    expect(amountSlider).toHaveAttribute("min", "1000");
    expect(amountSlider).toHaveAttribute("max", "20000");
    expect(amountSlider).toHaveAttribute("step", "100");

    expect(termSlider).toHaveAttribute("min", "1");
    expect(termSlider).toHaveAttribute("max", "5");
    expect(termSlider).toHaveAttribute("step", "0.5");
  });

  it("should handle quote button click", async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText("I want to borrow")).toBeInTheDocument();
    });

    const quoteButton = screen.getByTestId(TEST_IDS.getQuoteButton);
    fireEvent.click(quoteButton);

    await waitFor(() => {
      expect(screen.getByText("Quote Submitted!")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("should have proper ARIA labels on sliders", async () => {
      render(<LoanCalculator />);

      await waitFor(() => {
        expect(screen.getByText("I want to borrow")).toBeInTheDocument();
      });

      const amountSlider = screen.getByTestId(TEST_IDS.loanAmountSlider);
      const termSlider = screen.getByTestId(TEST_IDS.loanTermSlider);

      expect(amountSlider).toHaveAttribute("aria-label");
      expect(termSlider).toHaveAttribute("aria-label");
      expect(amountSlider).toHaveAttribute("aria-describedby");
      expect(termSlider).toHaveAttribute("aria-describedby");
    });

    it("should have live regions for dynamic content", async () => {
      render(<LoanCalculator />);

      await waitFor(() => {
        expect(screen.getByText("I want to borrow")).toBeInTheDocument();
      });

      const loanAmountValue = screen.getByTestId(TEST_IDS.loanAmountValue);
      const interestRate = screen.getByTestId(TEST_IDS.interestRate);
      const monthlyPayment = screen.getByTestId(TEST_IDS.monthlyPayment);

      expect(loanAmountValue).toHaveAttribute("aria-live", "polite");
      expect(interestRate.closest("[aria-live]")).toHaveAttribute(
        "aria-live",
        "polite"
      );
      expect(monthlyPayment.closest("[aria-live]")).toHaveAttribute(
        "aria-live",
        "polite"
      );
    });

    it("should have proper heading structure", async () => {
      render(<LoanCalculator />);

      await waitFor(() => {
        expect(screen.getByText("I want to borrow")).toBeInTheDocument();
      });

      expect(
        screen.getByRole("heading", { name: "Loan Calculator" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Loan Calculation Results" })
      ).toBeInTheDocument();
    });

    it("should have labeled form controls", async () => {
      render(<LoanCalculator />);

      await waitFor(() => {
        expect(screen.getByText("I want to borrow")).toBeInTheDocument();
      });

      expect(screen.getByLabelText(/I want to borrow/)).toBeInTheDocument();
      expect(
        screen.getByRole("slider", { name: /Loan amount/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("slider", { name: /Loan term/ })
      ).toBeInTheDocument();
    });

    it("should have descriptive button text", async () => {
      render(<LoanCalculator />);

      await waitFor(() => {
        expect(screen.getByText("I want to borrow")).toBeInTheDocument();
      });

      const quoteButton = screen.getByTestId(TEST_IDS.getQuoteButton);

      expect(quoteButton).toBeInTheDocument();
      expect(quoteButton).toHaveAttribute("aria-describedby");
    });

    it("should have proper regions and landmarks", async () => {
      render(<LoanCalculator />);

      await waitFor(() => {
        expect(screen.getByText("I want to borrow")).toBeInTheDocument();
      });

      expect(
        screen.getByRole("region", { name: "Loan Calculator" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("region", { name: "Loan Calculation Results" })
      ).toBeInTheDocument();
    });
  });
});

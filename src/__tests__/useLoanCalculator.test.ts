import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoanCalculator } from "../hooks/useLoanCalculator";
import { DEFAULT_CONFIG } from "../config/loanConfig";

describe("useLoanCalculator Hook", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useLoanCalculator(DEFAULT_CONFIG));

    expect(result.current.loanAmount).toBe(7500);
    expect(result.current.loanTerm).toBe(2.5);
    expect(result.current.interestRate).toBe(8.5);
    expect(result.current.monthlyPayment).toBeGreaterThan(0);
  });

  it("should initialize with custom values", () => {
    const customConfig = {
      ...DEFAULT_CONFIG,
      loanAmount: { ...DEFAULT_CONFIG.loanAmount, default: 10000 },
      loanTerm: { ...DEFAULT_CONFIG.loanTerm, default: 3 },
    };
    const { result } = renderHook(() => useLoanCalculator(customConfig));

    expect(result.current.loanAmount).toBe(10000);
    expect(result.current.loanTerm).toBe(3);
    expect(result.current.interestRate).toBe(9.7);
  });

  it("should update loan amount when handleAmountChange is called", () => {
    const { result } = renderHook(() => useLoanCalculator(DEFAULT_CONFIG));

    act(() => {
      result.current.handleAmountChange({
        target: { value: "15000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.loanAmount).toBe(15000);
    expect(result.current.interestRate).toBe(9.7);
  });

  it("should update loan term when handleTermChange is called", () => {
    const { result } = renderHook(() => useLoanCalculator(DEFAULT_CONFIG));

    act(() => {
      result.current.handleTermChange({
        target: { value: "1" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.loanTerm).toBe(1);
  });

  it("should recalculate monthly payment when values change", () => {
    const { result } = renderHook(() => useLoanCalculator(DEFAULT_CONFIG));

    const initialPayment = result.current.monthlyPayment;

    act(() => {
      result.current.handleAmountChange({
        target: { value: "10000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.monthlyPayment).not.toBe(initialPayment);
  });

  it("should maintain stable function references", () => {
    const { result, rerender } = renderHook(() =>
      useLoanCalculator(DEFAULT_CONFIG)
    );

    const firstHandleAmountChange = result.current.handleAmountChange;
    const firstHandleTermChange = result.current.handleTermChange;

    rerender();

    expect(result.current.handleAmountChange).toBe(firstHandleAmountChange);
    expect(result.current.handleTermChange).toBe(firstHandleTermChange);
  });
});

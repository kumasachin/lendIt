// Types for LoanContext

export interface LoanState {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  isCalculating: boolean;
  error: string | null;
}

export type LoanAction =
  | { type: "SET_LOAN_AMOUNT"; payload: number }
  | { type: "SET_LOAN_TERM"; payload: number }
  | {
      type: "SET_CALCULATIONS";
      payload: { interestRate: number; monthlyPayment: number };
    }
  | { type: "SET_CALCULATING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };
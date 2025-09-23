// Reducer logic for LoanContext
import type { LoanState, LoanAction } from "./loanTypes";

// Initial state
export const initialState: LoanState = {
  loanAmount: 7500,
  loanTerm: 2.5,
  interestRate: 10,
  monthlyPayment: 0,
  isCalculating: false,
  error: null,
};

// Reducer
export const loanReducer = (
  state: LoanState,
  action: LoanAction
): LoanState => {
  switch (action.type) {
    case "SET_LOAN_AMOUNT":
      return {
        ...state,
        loanAmount: action.payload,
        error: null,
      };
    case "SET_LOAN_TERM":
      return {
        ...state,
        loanTerm: action.payload,
        error: null,
      };
    case "SET_CALCULATIONS":
      return {
        ...state,
        interestRate: action.payload.interestRate,
        monthlyPayment: action.payload.monthlyPayment,
        isCalculating: false,
      };
    case "SET_CALCULATING":
      return {
        ...state,
        isCalculating: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isCalculating: false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

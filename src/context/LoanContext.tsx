import React, { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import { loanReducer, initialState } from "./loanReducer";
import type { LoanState, LoanAction } from "./loanTypes";

// Context
const LoanContext = createContext<{
  state: LoanState;
  dispatch: React.Dispatch<LoanAction>;
} | null>(null);

// Provider component
interface LoanProviderProps {
  children: ReactNode;
}

export const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(loanReducer, initialState);

  return (
    <LoanContext.Provider value={{ state, dispatch }}>
      {children}
    </LoanContext.Provider>
  );
};

// Export LoanContext for use in other files
export { LoanContext };

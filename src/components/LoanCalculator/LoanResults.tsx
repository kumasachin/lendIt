/**
 * Loan Calculator - Results Display Component
 * Shows calculated interest rate and monthly payment
 */

import React from "react";
import { formatCurrency } from "../../utils/calculations";
import type { LoanConfig } from "../../config/loanConfig";
import { TEST_IDS } from "../../config/loanConfig";
import styled from "styled-components";
import { theme } from "../../design-system";

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
  padding: ${theme.spacing[4]};
  background-color: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.neutral[200]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[4]};
  }
`;

const ResultItem = styled.div`
  text-align: center;
`;

const ResultValue = styled.div`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize["2xl"]};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary[500]};
  margin-bottom: ${theme.spacing[1]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

const ResultLabel = styled.div`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.neutral[600]};
`;

const VisuallyHidden = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

interface LoanResultsProps {
  interestRate: number;
  monthlyPayment: number;
  config: LoanConfig;
}

export const LoanResults: React.FC<LoanResultsProps> = ({
  interestRate,
  monthlyPayment,
  config,
}) => {
  return (
    <section role="region" aria-labelledby="results-title">
      <VisuallyHidden id="results-title">
        Loan Calculation Results
      </VisuallyHidden>

      <ResultsContainer>
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
            {config.currency?.code
              ? formatCurrency(monthlyPayment, config)
              : `${config.currency?.symbol || "£"}${monthlyPayment.toFixed(2)}`}
          </ResultValue>
          <ResultLabel id="monthly-payment-label">
            Monthly repayment
          </ResultLabel>
        </ResultItem>
      </ResultsContainer>
    </section>
  );
};

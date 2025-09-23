/**
 * Loan Calculator - Error Display Component
 * Shows error messages with retry and dismiss actions
 */

import React from "react";
import { Button } from "../../design-system";
import styled from "styled-components";
import { theme } from "../../design-system";

const ErrorContainer = styled.div`
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[500]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
`;

const ErrorMessage = styled.div`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.error[700]};
  margin-bottom: ${theme.spacing[3]};
`;

const ErrorActions = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${theme.spacing[2]};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface ErrorDisplayProps {
  error: string;
  isSubmittingQuote: boolean;
  onRetry: () => void;
  onDismiss: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  isSubmittingQuote,
  onRetry,
  onDismiss,
}) => {
  return (
    <ErrorContainer role="alert" aria-live="assertive">
      <ErrorMessage>{error}</ErrorMessage>
      <ErrorActions>
        <Button
          variant="primary"
          size="small"
          onClick={onRetry}
          disabled={isSubmittingQuote}
          aria-label="Retry quote submission"
        >
          {isSubmittingQuote && <LoadingSpinner />}
          Try Again
        </Button>
        <Button
          variant="ghost"
          size="small"
          onClick={onDismiss}
          aria-label="Dismiss error message"
        >
          Dismiss
        </Button>
      </ErrorActions>
    </ErrorContainer>
  );
};

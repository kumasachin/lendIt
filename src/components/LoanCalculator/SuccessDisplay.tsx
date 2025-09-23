/**
 * Loan Calculator - Success Display Component
 * Shows success message after quote submission
 */

import React from "react";
import styled from "styled-components";
import { theme } from "../../design-system";

const SuccessContainer = styled.div`
  background-color: ${theme.colors.success[50]};
  border: 1px solid ${theme.colors.success[500]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
`;

const SuccessMessage = styled.div`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.success[700]};
  margin-bottom: ${theme.spacing[2]};
`;

const SuccessDetails = styled.div`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.success[600]};
`;

interface SuccessDisplayProps {
  message: string;
  quoteId?: string;
}

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({
  message,
  quoteId,
}) => {
  return (
    <SuccessContainer role="status" aria-live="polite">
      <SuccessMessage>Quote Submitted Successfully!</SuccessMessage>
      <SuccessDetails>
        {message}
        {quoteId && (
          <>
            <br />
            Quote ID: {quoteId}
          </>
        )}
      </SuccessDetails>
    </SuccessContainer>
  );
};

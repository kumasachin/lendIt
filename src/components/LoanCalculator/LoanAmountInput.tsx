/**
 * Loan Calculator - Amount Input Component
 * Handles loan amount slider with display and accessibility
 */

import React from "react";
import { Slider, Text } from "../../design-system";
import { formatCurrency } from "../../utils/calculations";
import type { LoanConfig } from "../../config/loanConfig";
import { TEST_IDS } from "../../config/loanConfig";
import styled from "styled-components";
import { theme } from "../../design-system";

const AmountSection = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const AmountDisplay = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[4]};
`;

const VisuallyHidden = styled.span`
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

const LabelText = styled.label`
  display: block;
  text-align: center;
  margin-bottom: ${theme.spacing[4]};
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.neutral[900]};
`;

interface LoanAmountInputProps {
  loanAmount: number;
  config: LoanConfig;
  onChange: (value: number) => void;
}

export const LoanAmountInput: React.FC<LoanAmountInputProps> = ({
  loanAmount,
  config,
  onChange,
}) => {
  const handleSliderChange = (value: number) => {
    onChange(value);
  };

  return (
    <AmountSection>
      <LabelText htmlFor="loan-amount-slider">I want to borrow</LabelText>

      <AmountDisplay>
        <Text
          variant="h3"
          weight="bold"
          color="primary"
          aria-live="polite"
          aria-atomic="true"
          data-testid={TEST_IDS.loanAmountValue}
        >
          {config.currency?.code
            ? formatCurrency(loanAmount, config)
            : `${config.currency?.symbol || "£"}${loanAmount.toFixed(2)}`}
        </Text>
      </AmountDisplay>

      <Slider
        id="loan-amount-slider"
        min={config.loanAmount.min}
        max={config.loanAmount.max}
        step={config.loanAmount.step}
        value={loanAmount}
        onChange={handleSliderChange}
        data-testid={TEST_IDS.loanAmountSlider}
        aria-describedby="loan-amount-help"
        aria-label={`Loan amount: ${
          config.currency?.code
            ? formatCurrency(loanAmount, config)
            : `${config.currency?.symbol || "£"}${loanAmount.toFixed(2)}`
        }`}
      />

      <VisuallyHidden id="loan-amount-help">
        Use arrow keys or drag to adjust loan amount between{" "}
        {config.currency?.code
          ? formatCurrency(config.loanAmount.min, config)
          : `${config.currency?.symbol || "£"}${config.loanAmount.min.toFixed(
              2
            )}`}{" "}
        and{" "}
        {config.currency?.code
          ? formatCurrency(config.loanAmount.max, config)
          : `${config.currency?.symbol || "£"}${config.loanAmount.max.toFixed(
              2
            )}`}{" "}
        in steps of{" "}
        {config.currency?.code
          ? formatCurrency(config.loanAmount.step, config)
          : `${config.currency?.symbol || "£"}${config.loanAmount.step.toFixed(
              2
            )}`}
      </VisuallyHidden>
    </AmountSection>
  );
};

/**
 * Loan Calculator - Term Input Component
 * Handles loan term slider with display and accessibility
 */

import React from "react";
import { Slider } from "../../design-system";
import { formatYears } from "../../utils/calculations";
import type { LoanConfig } from "../../config/loanConfig";
import { TEST_IDS } from "../../config/loanConfig";
import styled from "styled-components";
import { theme } from "../../design-system";

const TermSection = styled.div`
  margin-bottom: ${theme.spacing[6]};
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

interface LoanTermInputProps {
  loanTerm: number;
  config: LoanConfig;
  onChange: (value: number) => void;
}

export const LoanTermInput: React.FC<LoanTermInputProps> = ({
  loanTerm,
  config,
  onChange,
}) => {
  const handleSliderChange = (value: number) => {
    onChange(value);
  };

  return (
    <TermSection>
      <LabelText
        htmlFor="loan-term-slider"
        data-testid={TEST_IDS.loanTermValue}
      >
        over {formatYears(loanTerm)}
      </LabelText>

      <Slider
        id="loan-term-slider"
        min={config.loanTerm.min}
        max={config.loanTerm.max}
        step={config.loanTerm.step}
        value={loanTerm}
        onChange={handleSliderChange}
        data-testid={TEST_IDS.loanTermSlider}
        aria-describedby="loan-term-help"
        aria-label={`Loan term: ${formatYears(loanTerm)}`}
      />

      <VisuallyHidden id="loan-term-help">
        Use arrow keys or drag to adjust loan term between {config.loanTerm.min}{" "}
        and {config.loanTerm.max} years in {config.loanTerm.step} year
        increments
      </VisuallyHidden>
    </TermSection>
  );
};

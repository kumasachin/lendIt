/**
 * Loan Calculator - Main Component (Refactored with Design System)
 * Comprehensive loan calculator using design system components
 */

import React, { useState, useEffect } from "react";
import { Button, Card } from "../design-system";
import { formatCurrency, formatYears } from "../utils/calculations";
import { useLoanCalculator } from "../hooks/useLoanCalculator";
import { getLoanConfig } from "../api/loanApi";
import { TEST_IDS, DEFAULT_CONFIG } from "../config/loanConfig";
import type { LoanConfig } from "../config/loanConfig";

import { LoanAmountInput } from "./LoanCalculator/LoanAmountInput";
import { LoanTermInput } from "./LoanCalculator/LoanTermInput";
import { LoanResults } from "./LoanCalculator/LoanResults";
import { ErrorDisplay } from "./LoanCalculator/ErrorDisplay";
import { SuccessDisplay } from "./LoanCalculator/SuccessDisplay";

import styled from "styled-components";
import { theme } from "../design-system";

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #673ab7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[4]};
`;

const CalculatorContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing[10]};
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${theme.colors.neutral[300]};
  border-top: 3px solid ${theme.colors.primary[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto ${theme.spacing[4]};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.neutral[600]};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing[6]};
  padding: ${theme.spacing[6]};
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuoteButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonSpinner = styled.div`
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

const VisuallyHidden = styled.div`
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

const LoanCalculator: React.FC = () => {
  const [config, setConfig] = useState<LoanConfig>(DEFAULT_CONFIG);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  const {
    loanAmount,
    loanTerm,
    handleAmountChange,
    handleTermChange,
    handleQuote,
    interestRate,
    monthlyPayment,
    hasQuoted,
    isLoading,
    error,
    isSubmittingQuote,
    quoteResponse,
    clearError,
    retryQuote,
  } = useLoanCalculator(config);

  // Load configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const fetchedConfig = await getLoanConfig();
        setConfig(fetchedConfig);
      } catch (error) {
        console.error("Failed to load configuration:", error);
        // Continue with default config
      } finally {
        setIsConfigLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Wrapper functions to convert between event and value handlers
  const handleAmountValueChange = (value: number) => {
    const event = {
      target: { value: value.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    handleAmountChange(event);
  };

  const handleTermValueChange = (value: number) => {
    const event = {
      target: { value: value.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    handleTermChange(event);
  };

  if (isConfigLoading) {
    return (
      <AppContainer>
        <CalculatorContainer>
          <Card
            variant="elevated"
            padding="large"
            data-testid={TEST_IDS.calculatorCard}
          >
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>Loading calculator...</LoadingText>
            </LoadingContainer>
          </Card>
        </CalculatorContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <CalculatorContainer>
        <Card
          variant="elevated"
          padding="large"
          data-testid={TEST_IDS.calculatorCard}
        >
          <div role="region" aria-labelledby="calculator-title">
            <VisuallyHidden>
              <h1 id="calculator-title">Loan Calculator</h1>
            </VisuallyHidden>

            <LoanAmountInput
              loanAmount={loanAmount}
              config={config}
              onChange={handleAmountValueChange}
            />

            <LoanTermInput
              loanTerm={loanTerm}
              config={config}
              onChange={handleTermValueChange}
            />

            <LoanResults
              interestRate={interestRate}
              monthlyPayment={monthlyPayment}
              config={config}
            />

            {/* Error Display */}
            {error && (
              <ErrorDisplay
                error={error}
                isSubmittingQuote={isSubmittingQuote}
                onRetry={retryQuote}
                onDismiss={clearError}
              />
            )}

            {/* Success Display */}
            {quoteResponse && quoteResponse.success && (
              <SuccessDisplay
                message={quoteResponse.message}
                quoteId={quoteResponse.quoteId}
              />
            )}

            <ButtonContainer>
              <Button
                variant="primary"
                size="large"
                onClick={handleQuote}
                disabled={isLoading || hasQuoted || isSubmittingQuote}
                data-testid={TEST_IDS.getQuoteButton}
                aria-describedby="quote-description"
              >
                <QuoteButtonContent>
                  {(isLoading || isSubmittingQuote) && <ButtonSpinner />}
                  {hasQuoted ? "Quote Submitted!" : "Get your quote »"}
                </QuoteButtonContent>
              </Button>
            </ButtonContainer>

            <VisuallyHidden id="quote-description">
              Get a personalized loan quote based on your selected amount of{" "}
              {config && !isConfigLoading
                ? formatCurrency(loanAmount, config)
                : `${config.currency.symbol}${loanAmount}`}{" "}
              over {formatYears(loanTerm)} at {interestRate}% interest rate
            </VisuallyHidden>
          </div>
        </Card>
      </CalculatorContainer>
    </AppContainer>
  );
};

export default LoanCalculator;

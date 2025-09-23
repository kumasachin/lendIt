import styled from "styled-components";

// Responsive breakpoints
const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff0066, #323f7b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const CalculatorCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: ${breakpoints.tablet}) {
    padding: 30px;
    max-width: 90vw;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
    border-radius: 4px;
    max-width: 95vw;
  }
`;

export const LoanAmountSection = styled.div`
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 30px;
  }
`;

export const LoanAmountLabel = styled.div`
  color: #999;
  font-size: 25px;
  font-weight: light;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 22px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;

export const LoanAmountValue = styled.div`
  color: #999;
  font-size: 25px;
  font-weight: light;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 22px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;

export const LoanTermSection = styled.div`
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 30px;
  }
`;

export const LoanTermLabel = styled.div`
  color: #999;
  font-size: 25px;
  font-weight: light;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 22px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  margin: 20px 0;

  @media (max-width: ${breakpoints.mobile}) {
    margin: 15px 0;
  }
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;

  &:focus {
    outline: 2px solid #ff0066;
    outline-offset: 2px;
  }

  &:focus-visible {
    outline: 2px solid #ff0066;
    outline-offset: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ff0066;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 28px;
      height: 28px;
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ff0066;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 28px;
      height: 28px;
    }
  }
`;

export const ResultsSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
    margin-bottom: 30px;
  }
`;

export const ResultItem = styled.div`
  text-align: center;
  flex: 1;
`;

export const ResultLabel = styled.div`
  color: #999;
  font-size: 11px;
  font-weight: normal;
  margin-bottom: 5px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const ResultValue = styled.div`
  color: #999;
  font-size: 35px;
  font-weight: light;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const GetQuoteButton = styled.button`
  background: #ff0066;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 20px 40px;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #e6005c;
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
    background: #e6005c;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 18px 30px;
    font-size: 16px;
  }
`;

export const ResetButton = styled.button`
  background: transparent;
  color: #999;
  border: 2px solid #999;
  border-radius: 4px;
  padding: 18px 30px;
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #999;
    color: white;
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid #ff0066;
    outline-offset: 2px;
  }

  &:focus-visible {
    outline: 2px solid #ff0066;
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 16px 25px;
    font-size: 14px;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #ff0066;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const VisuallyHidden = styled.span`
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

export const SliderLabel = styled.label`
  display: block;
  color: #999;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 8px;
`;

export const SliderValueDisplay = styled.div`
  color: #666;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

export const ErrorContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  color: #dc2626;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
    margin: 12px 0;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const ErrorActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const RetryButton = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }

  &:focus {
    outline: 2px solid #dc2626;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DismissButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 0;

  &:hover {
    color: #b91c1c;
  }

  &:focus {
    outline: 2px solid #dc2626;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const SuccessContainer = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  color: #166534;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
    margin: 12px 0;
  }
`;

export const SuccessMessage = styled.p`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
`;

export const SuccessDetails = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.8;
`;

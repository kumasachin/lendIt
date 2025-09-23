/**
 * Design System - Slider Component
 * Accessible range input slider for loan calculator
 */

import styled, { css } from "styled-components";
import { theme } from "../tokens";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  "data-testid"?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSlider = styled.input<{ disabled?: boolean }>`
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: ${theme.borderRadius.full};
  background: #e8e8e8;
  outline: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  /* Webkit Browsers */
  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colors.primary[500]};
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(1.05);
    }
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colors.primary[500]};
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(1.05);
    }
  }

  &::-moz-range-track {
    width: 100%;
    height: 8px;
    border-radius: ${theme.borderRadius.full};
    background: #e8e8e8;
    border: none;
  }

  /* Focus styles for accessibility */
  &:focus-visible {
    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px ${theme.colors.primary[500]}40, 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    &::-moz-range-thumb {
      box-shadow: 0 0 0 3px ${theme.colors.primary[500]}40, 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    &::-webkit-slider-thumb {
      width: 28px;
      height: 28px;
    }

    &::-moz-range-thumb {
      width: 28px;
      height: 28px;
    }
  }
`;

// Progress track styling
const SliderTrack = styled.div<{ progress: number; disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 8px;
  width: ${(props) => props.progress}%;
  background: ${(props) =>
    props.disabled ? theme.colors.neutral[300] : theme.colors.primary[500]};
  border-radius: ${theme.borderRadius.full};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  disabled = false,
  id,
  name,
  "data-testid": dataTestId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <SliderContainer>
      <SliderTrack progress={progress} disabled={disabled} />
      <StyledSlider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        data-testid={dataTestId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      />
    </SliderContainer>
  );
};

export default Slider;

/**
 * Design System - Input Component
 * Reusable input component with consistent styling and accessibility
 */

import styled, { css } from "styled-components";
import { theme } from "../tokens";

export type InputSize = "small" | "medium" | "large";
export type InputVariant = "default" | "error";

interface InputProps {
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "email" | "password" | "tel";
  id?: string;
  name?: string;
  "data-testid"?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  min?: number;
  max?: number;
  step?: number;
}

// Size Styles
const sizeStyles = {
  small: css`
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
    min-height: 2rem;
  `,
  medium: css`
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    font-size: ${theme.typography.fontSize.base};
    min-height: 2.5rem;
  `,
  large: css`
    padding: ${theme.spacing[4]} ${theme.spacing[5]};
    font-size: ${theme.typography.fontSize.lg};
    min-height: 3rem;
  `,
};

// Variant Styles
const variantStyles = {
  default: css`
    border: 1px solid ${theme.colors.neutral[300]};

    &:hover:not(:disabled) {
      border-color: ${theme.colors.neutral[400]};
    }

    &:focus {
      border-color: ${theme.colors.primary[500]};
      box-shadow: 0 0 0 2px ${theme.colors.primary[500]}40;
    }
  `,
  error: css`
    border: 1px solid ${theme.colors.error[500]};

    &:hover:not(:disabled) {
      border-color: ${theme.colors.error[600]};
    }

    &:focus {
      border-color: ${theme.colors.error[500]};
      box-shadow: 0 0 0 2px ${theme.colors.error[500]}40;
    }
  `,
};

const StyledInput = styled.input<InputProps>`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  background-color: ${theme.colors.neutral[50]};
  color: ${theme.colors.neutral[900]};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  outline: none;
  width: 100%;

  ${(props) => sizeStyles[props.size || "medium"]}
  ${(props) => variantStyles[props.variant || "default"]}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    background-color: ${theme.colors.neutral[100]};
    color: ${theme.colors.neutral[500]};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${theme.colors.neutral[400]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.size === "large" && sizeStyles.medium}
  }
`;

export const Input: React.FC<InputProps> = ({
  size = "medium",
  variant = "default",
  fullWidth = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  id,
  name,
  "data-testid": dataTestId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  min,
  max,
  step,
  ...props
}) => {
  return (
    <StyledInput
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      type={type}
      id={id}
      name={name}
      data-testid={dataTestId}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      min={min}
      max={max}
      step={step}
      {...props}
    />
  );
};

export default Input;

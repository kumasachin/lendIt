/**
 * Design System - Button Component
 * Reusable button component with consistent styling and accessibility
 */

import styled, { css } from "styled-components";
import { theme } from "../tokens";

// Button Variants
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "data-testid"?: string;
}

// Variant Styles
const variantStyles = {
  primary: css`
    background: linear-gradient(135deg, #ff0066 0%, #e91e63 100%);
    color: white;
    border: 1px solid #ff0066;
    box-shadow: 0 4px 8px rgba(255, 0, 102, 0.3);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
      border-color: #e91e63;
      box-shadow: 0 6px 12px rgba(255, 0, 102, 0.4);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background: linear-gradient(135deg, #d81b60 0%, #c2185b 100%);
      border-color: #d81b60;
      transform: translateY(0px);
    }
  `,
  secondary: css`
    background-color: ${theme.colors.neutral[100]};
    color: ${theme.colors.neutral[900]};
    border: 1px solid ${theme.colors.neutral[300]};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.neutral[200]};
      border-color: ${theme.colors.neutral[400]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.neutral[300]};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${theme.colors.primary[500]};
    border: 1px solid ${theme.colors.primary[500]};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[50]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[100]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.neutral[700]};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.neutral[100]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.neutral[200]};
    }
  `,
};

// Size Styles
const sizeStyles = {
  small: css`
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    min-height: 2rem;
  `,
  medium: css`
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    min-height: 2.5rem;
  `,
  large: css`
    padding: ${theme.spacing[4]} ${theme.spacing[6]};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    min-height: 3rem;
  `,
};

const StyledButton = styled.button<ButtonProps>`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
  position: relative;
  font-weight: ${theme.typography.fontWeight.semibold};
  letter-spacing: 0.025em;

  ${(props) => variantStyles[props.variant || "primary"]}
  ${(props) => sizeStyles[props.size || "medium"]}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${theme.colors.primary[500]}40;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.size === "large" && sizeStyles.medium}
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = "button",
  "data-testid": dataTestId,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

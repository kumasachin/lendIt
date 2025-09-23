/**
 * Design System - Card Component
 * Reusable card component for content containers
 */

import styled, { css } from "styled-components";
import { theme } from "../tokens";

export type CardVariant = "default" | "elevated" | "outlined";
export type CardPadding = "none" | "small" | "medium" | "large";

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}

// Variant Styles
const variantStyles = {
  default: css`
    background-color: ${theme.colors.neutral[50]};
    border: 1px solid ${theme.colors.neutral[200]};
    box-shadow: none;
  `,
  elevated: css`
    background-color: white;
    border: 1px solid ${theme.colors.neutral[100]};
    box-shadow: ${theme.shadows.md};
  `,
  outlined: css`
    background-color: white;
    border: 1px solid ${theme.colors.neutral[300]};
    box-shadow: none;
  `,
};

// Padding Styles
const paddingStyles = {
  none: css`
    padding: 0;
  `,
  small: css`
    padding: ${theme.spacing[4]};
  `,
  medium: css`
    padding: ${theme.spacing[6]};
  `,
  large: css`
    padding: ${theme.spacing[8]};
  `,
};

const StyledCard = styled.div<CardProps>`
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease-in-out;

  ${(props) => variantStyles[props.variant || "default"]}
  ${(props) => paddingStyles[props.padding || "medium"]}

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.padding === "large" && paddingStyles.medium}
    border-radius: ${theme.borderRadius.md};
  }
`;

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "medium",
  children,
  className,
  "data-testid": dataTestId,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      className={className}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;

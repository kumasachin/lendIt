/**
 * Design System - Text Component
 * Reusable text component with consistent typography
 */

import styled, { css } from "styled-components";
import { theme } from "../tokens";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "small"
  | "caption";
export type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";
export type TextColor = "primary" | "neutral" | "success" | "error" | "warning";

interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
  as?: React.ElementType;
}

// Variant Styles
const variantStyles = {
  h1: css`
    font-size: ${theme.typography.fontSize["5xl"]};
    line-height: ${theme.typography.lineHeight.tight};
    font-weight: ${theme.typography.fontWeight.bold};
  `,
  h2: css`
    font-size: ${theme.typography.fontSize["4xl"]};
    line-height: ${theme.typography.lineHeight.tight};
    font-weight: ${theme.typography.fontWeight.bold};
  `,
  h3: css`
    font-size: ${theme.typography.fontSize["3xl"]};
    line-height: ${theme.typography.lineHeight.snug};
    font-weight: ${theme.typography.fontWeight.semibold};
  `,
  h4: css`
    font-size: ${theme.typography.fontSize["2xl"]};
    line-height: ${theme.typography.lineHeight.snug};
    font-weight: ${theme.typography.fontWeight.semibold};
  `,
  h5: css`
    font-size: ${theme.typography.fontSize.xl};
    line-height: ${theme.typography.lineHeight.normal};
    font-weight: ${theme.typography.fontWeight.semibold};
  `,
  h6: css`
    font-size: ${theme.typography.fontSize.lg};
    line-height: ${theme.typography.lineHeight.normal};
    font-weight: ${theme.typography.fontWeight.medium};
  `,
  body: css`
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.relaxed};
    font-weight: ${theme.typography.fontWeight.normal};
  `,
  small: css`
    font-size: ${theme.typography.fontSize.sm};
    line-height: ${theme.typography.lineHeight.normal};
    font-weight: ${theme.typography.fontWeight.normal};
  `,
  caption: css`
    font-size: ${theme.typography.fontSize.xs};
    line-height: ${theme.typography.lineHeight.normal};
    font-weight: ${theme.typography.fontWeight.normal};
  `,
};

// Color Styles
const colorStyles = {
  primary: css`
    color: ${theme.colors.primary[500]};
  `,
  neutral: css`
    color: ${theme.colors.neutral[900]};
  `,
  success: css`
    color: ${theme.colors.success[600]};
  `,
  error: css`
    color: ${theme.colors.error[600]};
  `,
  warning: css`
    color: ${theme.colors.warning[600]};
  `,
};

// Weight Styles
const weightStyles = {
  light: css`
    font-weight: ${theme.typography.fontWeight.light};
  `,
  normal: css`
    font-weight: ${theme.typography.fontWeight.normal};
  `,
  medium: css`
    font-weight: ${theme.typography.fontWeight.medium};
  `,
  semibold: css`
    font-weight: ${theme.typography.fontWeight.semibold};
  `,
  bold: css`
    font-weight: ${theme.typography.fontWeight.bold};
  `,
};

const StyledText = styled.div<TextProps>`
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  margin: 0;

  ${(props) => variantStyles[props.variant || "body"]}
  ${(props) => colorStyles[props.color || "neutral"]}
  ${(props) => props.weight && weightStyles[props.weight]}
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.variant === "h1" && variantStyles.h2}
    ${(props) => props.variant === "h2" && variantStyles.h3}
    ${(props) => props.variant === "h3" && variantStyles.h4}
  }
`;

// Map variants to semantic HTML elements
const getSemanticElement = (variant?: TextVariant): React.ElementType => {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return variant;
    case "body":
      return "p";
    case "small":
    case "caption":
      return "span";
    default:
      return "p";
  }
};

export const Text: React.FC<TextProps> = ({
  variant = "body",
  weight,
  color = "neutral",
  align,
  children,
  className,
  "data-testid": dataTestId,
  as,
  ...props
}) => {
  const Element = as || getSemanticElement(variant);

  return (
    <StyledText
      as={Element}
      variant={variant}
      weight={weight}
      color={color}
      align={align}
      className={className}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;

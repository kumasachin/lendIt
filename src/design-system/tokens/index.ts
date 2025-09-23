/**
 * Design System - Central Token Export
 * Exports all design tokens for easy importing
 */

export { colors, type ColorToken } from "./colors";
export { typography, type TypographyToken } from "./typography";
export {
  spacing,
  breakpoints,
  borderRadius,
  shadows,
  type SpacingToken,
  type BreakpointToken,
  type BorderRadiusToken,
  type ShadowToken,
} from "./spacing";

// Re-export for easier importing
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing, breakpoints, borderRadius, shadows } from "./spacing";

// Design System Theme
export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

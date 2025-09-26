# LendNow Loan Calculator

A React TypeScript loan calculator that allows users to calculate monthly repayments with interactive sliders for loan amount and term selection.

## Features

- **Interactive Sliders**: Adjust loan amount (£1,000-£20,000) and loan term (1-5 years in 6-month steps)
- **Dynamic Interest Rates**: Automatically updates based on loan amount brackets
- **Real-time Calculations**: Monthly repayment calculation updates instantly
- **Responsive Design**: Matches the provided mockup design with gradient background
- **TypeScript**: Full type safety throughout the application
- **Comprehensive Testing**: Unit tests for both components and utility functions
- **Full Accessibility**: WCAG 2.1 AA compliant with comprehensive accessibility features

## Accessibility Features

- **ARIA Labels**: All interactive elements have descriptive ARIA labels
- **Live Regions**: Dynamic content updates announced to screen readers
- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Screen Reader Support**: Comprehensive semantic markup and landmarks
- **High Contrast**: Support for high contrast mode preferences
- **Reduced Motion**: Respects user's reduced motion preferences
- **Focus Management**: Visible focus indicators and logical tab order
- **Semantic HTML**: Proper heading structure and form labels

## Interest Rate Brackets

| Loan Amount       | Interest Rate |
| ----------------- | ------------- |
| £1,000 - £4,999   | 5%            |
| £5,000 - £9,999   | 10%           |
| £10,000 - £14,999 | 15%           |
| £15,000 - £20,000 | 20%           |

## Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Styled Components** for CSS-in-JS styling
- **Vitest** for testing
- **Testing Library** for component testing
- **pnpm** for package management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
```

### Running the Application

Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

## Testing

Run all tests:

```bash
pnpm run test
```

Run tests in watch mode:

```bash
pnpm run test:ui
```

Run tests once:

```bash
pnpm run test:run
```

## Project Structure

```
src/
├── components/
│   ├── LoanCalculator.tsx    # Main calculator component with accessibility
│   └── StyledComponents.ts   # Styled components with focus states
├── hooks/
│   └── useLoanCalculator.ts  # Custom hook for calculator logic
├── utils/
│   └── calculations.ts       # Utility functions for calculations
├── __tests__/
│   ├── calculations.test.ts  # Tests for utility functions
│   ├── useLoanCalculator.test.ts # Tests for custom hook
│   └── LoanCalculator.test.tsx # Tests for main component + accessibility
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Global styles with accessibility features
```

## Implementation Details

### Loan Calculation Formula

The monthly payment is calculated using the standard loan payment formula:

```
PMT = P * [r(1 + r)^n] / [(1 + r)^n - 1]
```

Where:

- P = Principal amount (loan amount)
- r = Monthly interest rate (annual rate / 12)
- n = Total number of payments (years \* 12)

### Design Considerations

- **Performance**: Used `useCallback` for event handlers and custom hook to prevent unnecessary re-renders
- **Accessibility**: Full WCAG 2.1 AA compliance with ARIA labels, live regions, and keyboard navigation
- **Type Safety**: Comprehensive TypeScript typing throughout
- **Testing**: High test coverage including accessibility testing for both logic and UI interactions
- **Responsive**: Mobile-friendly design that adapts to different screen sizes
- **Maintainability**: Clean separation of concerns with custom hooks and styled components

## Browser Support

This application supports all modern browsers that support ES2015+ features.

## Development

The project uses:

- ESLint for code linting
- TypeScript for type checking
- Vite for fast HMR during development
- Styled Components for component-scoped styling

## Notes

- The monthly payment calculation aims to provide accurate results but may not exactly match the live LendNow website due to potential differences in rounding, fees, or other factors
- The design closely follows the provided mockup with some minor adjustments for improved usability
- All tests pass and there are no console errors in the browser

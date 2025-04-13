# UI Components

This directory contains shadcn UI style components for React Native, based on the React Native Reusables (RNR) setup.

## Components

- **Avatar**: For displaying user avatars with fallback support
- **Button**: A flexible button component with various styles and sizes
- **Card**: For content containers with header, content, and footer sections
- **Text**: Typography component with variants for different text styles

## Usage

Import components directly from the components directory:

```tsx
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
```

Or use the barrel file to import multiple components:

```tsx
import { Button, Card, Text } from "@/components/ui";
```

## Theme

The theme is defined in:

- `global.css`: Contains CSS variables for colors and other design tokens
- `tailwind.config.js`: Configures the theme using the CSS variables
- `lib/constants.ts`: Contains navigation theme colors

## Utilities

- `lib/utils.ts`: Contains the `cn` utility for combining class names
- `lib/useColorScheme.tsx`: Hook for accessing and changing the color scheme
- `components/ToggleTheme.tsx`: Component for toggling between light and dark mode

## Icons

Icons are located in `lib/icons/` and use React Native SVG.

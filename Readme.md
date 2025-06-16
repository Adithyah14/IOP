## Core Framework & Technologies

- **React 18**
- **TypeScript**: Type safety is built-in by default
- **Vite**: Bundling and development server
- **TailwindCSS 3**: For styling

## Styling System

The styling system combines several technologies:

- **TailwindCSS 3**: Used as the primary styling method with utility classes
- **tailwind.config.ts**: Used to describe the design system tokens, update this file to change the whole look and feel
- **CSS Imports**: Base styles are imported in `src/index.css`
- **UI Component Library**: A comprehensive set of pre-styled UI components in `src/components/ui/` built with:
  - Radix UI: For accessible UI primitives
  - Class Variance Authority: For component variants
  - TailwindCSS: For styling
  - Lucide React: For icons

## Architecture Overview

The architecture follows a modern React application structure:

```
package.json
app/
├── components/     # Reusable UI components
│   └── ui/         # Core UI component library
├── routes/         # Route components and logic
├── app.css         # Global styles
├── root.tsx        # Root layout and error boundary
└── routes.ts       # Route configuration
```

This structure provides a clean separation of concerns between UI components, routes, and application logic.

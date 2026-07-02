# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 19 standalone-component dashboard application packaged with Electron as a desktop app. Uses Angular Material + Angular Flex Layout for the UI, NgRx for state management, and ng2-charts for data visualization.

## Key Commands

```bash
npm install              # Install dependencies (requires Node v22.x, npm 10.x)
ng serve                 # Dev server at http://localhost:4200/
ng build                 # Build to dist/
ng test                  # Run unit tests (Karma)
ng test --watch=false    # Single-run mode (CI-friendly)
npm start                # Launch Electron app (dev)
```

## Architecture

### Entry points and bootstrapping
- `src/main.ts` — Angular bootstrap via `bootstrapApplication()` in standalone mode.
- `src/app/app.config.ts` — App-level config: provides `environment`, Material theming, Flex Layout, NgRx store/effects, chart defaults.
- `src/app/app.routes.ts` — Route map to feature components (dashboard, users, events, admin, settings, about).

### Layout system
- `src/app/layouts/default/` — Shell layout with sidebar + toolbar + content outlet. Handles responsive breakpoints and theme switching.
- Sidebar (`src/app/shared/components/sidebar/`) — Navigation menu driven by route data; supports nested submenus (events has 3 levels).
- Theme toggle (`src/app/shared/components/theme-toggle/`) — Switches between light/dark/dracula themes via CSS custom properties on `:root`.

### Feature modules (all standalone)
Each feature lives under `src/app/features/<name>/` with its own component, template, styles, and spec file. Some features have sub-routes (events has 3 submenu components).

- **Dashboard** (`src/app/features/dashboard/`) — KPI grid (`kpi-panel/`), product performance table, chart widgets (bar, line, doughnut, pie).
- **Users** (`src/app/features/users/`) — User list with search/filter.
- **Events** (`src/app/features/events/`) — Event listing with 3 submenu levels.
- **Admin** (`src/app/features/admin/`) — Admin panel (roles, permissions).
- **Settings** (`src/app/features/settings/`) — Application settings.
- **About** (`src/app/features/about/`) — About page.

### Shared components
- `src/app/shared/components/sidebar/` — Navigation sidebar.
- `src/app/shared/components/theme-toggle/` — Theme switcher dropdown.

### Theming
Theme colors are defined as CSS custom properties on `:root` in `src/styles.scss`. Three themes (light, dark, dracula) swap these variables at runtime via the theme toggle component. All components reference `var(--*)` tokens rather than hardcoded colors.

### State management
NgRx store + effects for application state. Store configuration is in `src/app/app.config.ts`.

## Code Style Notes

- Standalone components only — no NgModules.
- Routes use `loadComponent` (lazy-loaded functions).
- Component selectors are kebab-case; class names follow PascalCase.
- SCSS files live alongside TS/HTML files per component directory.
- Test files: `*.spec.ts` alongside source, run via Karma/Jasmine.

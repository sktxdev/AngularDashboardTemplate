# Setup Script

Run `node scripts/setup.js` to customize this template for your project.

## What it does

1. Prompts for project metadata (name, author, theme, etc.)
2. Updates `package.json`, `angular.json`, `main.js`, `index.html`, environment files
3. Generates `src/app/config/app.config.overrides.ts` with your answers

## After setup

1. `npm install` — install dependencies with the new project name
2. `npm run start` — verify the dev server works
3. Edit `src/app/config/app.config.overrides.ts` for any further customizations
4. Replace `src/assets/` icons with your app's icons
5. Replace placeholder data in feature components with your own data

## Manual overrides

If you prefer not to run the setup script, you can manually edit:

- `package.json` — change `name` and add `author`
- `angular.json` — change the project name everywhere
- `src/app/config/app.config.overrides.ts` — set all your custom values
- `main.js` — update `appId`, `productName`, and `distPath`

The `AppConfigService` reads from `app.config.overrides.ts` at runtime, so editing that file alone is enough to customize the sidebar header, footer author, database name, and localStorage namespace.

# Cabinet6

Personal cabinet for utility services customers (water supply, heating, rent, payments).
React 18 + TypeScript + Vite SPA; the backend API lives at `https://communal.in.ua/Cabinet6api/`.
UI languages: Ukrainian (default), English, Russian.

One codebase serves several organizations. The organization is chosen at build time by
`VITE_ALIAS`: it sets the URL base (`/<alias>/`), the color theme and organization-specific
content on the login page. Known aliases are listed in `src/utils/constants.ts`.

## Setup

```bash
npm install
```

Create `.env` in the project root (it is not committed):

```
VITE_TOKEN_NAME = "Token"
VITE_ALIAS = "izmteplo"
```

## Commands

- `npm run dev` — dev server, opens at `http://localhost:5173/<alias>/`
- `npm run build` — type-check and production build into `./<alias>/`
- `npm run lint` — ESLint
- `npm run preview` — serve the production build locally

To build for another organization without editing `.env`:

```bash
VITE_ALIAS=bro1 npm run build
```

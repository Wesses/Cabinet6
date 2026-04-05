# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cabinet6 is a React 18 + TypeScript + Vite frontend-only SPA for utility services management (water supply, rent, payments). It communicates with an external backend API at `https://communal.in.ua/Cabinet6api/`. The app is localized for Ukrainian, English, and Russian.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — TypeScript type-check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm run preview` — Preview production build locally

No test framework is configured.

## Architecture

**Routing:** React Router 6 in `src/router/index.tsx`. Protected routes wrap through `src/pages/PrivateRoutes.tsx`. Pages: Login, Registration, Cabinet (invoice list), Invoice detail (`/cabinet/:id`).

**API layer:** All external API calls in `src/api/api.ts` using Axios. JWT token stored in a cookie (name from `VITE_TOKEN_NAME`), passed as `Authorization: Bearer` header. A global Axios interceptor catches 401 errors and redirects to login.

**State management:** React Context via `src/Contexts/UserProvider.tsx` for user state (username, companyName), persisted to localStorage. No external state library — components use local `useState`.

**UI components:** shadcn/ui pattern — Radix UI primitives in `src/components/ui/`, business components in `src/components/custom-components/`. Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for class composition. Always prefer existing ui primitives over raw HTML elements.

**Forms:** react-hook-form + zod for validation. See `LoginForm.tsx` and `CabinetAddInvoiceForm.tsx` for the standard pattern.

**i18n:** i18next with translations in `src/localization/translations/`. Use `useTranslation()` hook. When adding UI text, add keys to all language files (en, ua, ru).

**Types:** All shared TypeScript interfaces in `src/types/index.ts`.

## Key Conventions

- Path alias: `@/*` maps to `./src/*`
- Styling: Tailwind utility classes only — no raw CSS files. Reuse `components/ui/*` for accessible primitives.
- Toast notifications via `sonner` — use `showCustomToast()` from `src/utils/showCustomComponent.tsx`
- Token retrieval: `src/utils/getToken.ts`
- Environment variables: prefixed with `VITE_` (see `.env` for `VITE_BASE_URL`, `VITE_TOKEN_NAME`, `VITE_ALIAS`)
- Adding shadcn/ui components: configured via `components.json` (default style, neutral base color, no CSS variables)

## Common Modification Points

- **New API endpoint:** Add to `src/api/api.ts`, add response type to `src/types/index.ts`
- **New page/route:** Add page in `src/pages/`, register in `src/router/index.tsx`, wrap with `PrivateRoutes` if authenticated
- **New translations:** Edit JSON files in `src/localization/translations/` and the loader in `src/localization/i18n.ts`
- **Invoice tabs:** Extend in `src/components/custom-components/InvoiceServicesTabs/`

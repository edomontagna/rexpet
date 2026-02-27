---
glob: "src/**/*.{ts,tsx}"
---

# Code Style Rules

- Use functional components with arrow functions
- Use `@/` import alias for all src/ imports
- Prefer named exports for components, default export only for pages
- Use Tailwind utility classes for styling; avoid inline styles
- Brand tokens: `gold`, `navy`, `cream` (defined in tailwind.config.ts)
- Fonts: `font-serif` for headings, `font-sans` for body text
- All user-visible text must use `t()` from react-i18next
- Use Sonner for toast notifications (not shadcn Toaster)
- Service layer: all Supabase calls must go through `src/services/`
- Hooks: server state via React Query hooks in `src/hooks/`
- Forms: react-hook-form + Zod validation schemas
- No `any` types; use proper TypeScript interfaces
- Destructure props in function signature

---
glob: "src/**/*.test.*"
---

# Testing Rules

- Use Vitest + React Testing Library
- Test files co-located next to source files or in `src/test/`
- Naming: `ComponentName.test.tsx` or `hookName.test.ts`
- Test user behavior, not implementation details
- Mock Supabase client for service tests
- Use `screen.getByRole` over `getByTestId` when possible
- Run `npm run test` to verify all tests pass

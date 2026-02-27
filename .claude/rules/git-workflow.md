---
glob: "**/*"
---

# Git Workflow

- Commit messages: imperative mood, concise (e.g., "Add credit purchase modal")
- Never commit `.env` files or secrets
- Never commit `node_modules/` or `dist/`
- Keep commits focused: one logical change per commit
- Run `npm run build` before pushing to verify no build errors

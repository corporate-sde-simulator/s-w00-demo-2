# PR #187 Review — Registration Validator (by Priya Nair)

## Reviewer: Raj Patel — Jan 30, 2026

---

**Overall:** Good separation of concerns. A few validation edge cases need work.

### `registrationValidator.js`

> **Email regex:**
> The pattern looks close but I think `user@.com` might slip through.
> The part after @ should require at least one character before the dot.

> **Age check:**
> The boundary condition feels off. Double-check what happens at exactly 13.

> **Status code:**
> Registration creates a new user — should that be 201 instead of 200?

### `registrationService.js`

> Clean. No issues.

---

**Priya Nair** — Feb 1, 2026

> Good catches Raj. I'll fix these next sprint. (Then went on leave!)

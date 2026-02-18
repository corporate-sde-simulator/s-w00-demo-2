# PLATFORM-3001: Fix User Registration Input Validation

**Status:** In Progress · **Priority:** High
**Sprint:** Sprint 24 · **Story Points:** 3
**Reporter:** Sarah Kim (QA Lead) · **Assignee:** You (Intern)
**Due:** End of sprint (Friday)
**Labels:** `backend`, `auth`, `javascript`, `validation`
**Epic:** PLATFORM-2900 (User Management v3)
**Task Type:** Bug Fix

---

## Description

Our user registration endpoint (`POST /api/users/register`) has been passing QA for weeks,
but yesterday the mobile team deployed a new signup form and we're now seeing a flood of
invalid registrations getting through.

The validation logic in `registrationValidator.js` has three bugs:
1. Emails like `user@.com` (no domain name) are being accepted
2. Users under 13 are able to register (violates COPPA compliance!)
3. Successful registrations return status 200 instead of 201

The previous developer, Priya, wrote the validator but went on leave before QA caught these.

## Requirements

- Email must have a valid format: `something@domain.tld`
- Password must be ≥ 8 characters with at least 1 number
- Age must be ≥ 13 (COPPA compliance)
- Successful registration returns HTTP 201 (not 200)
- Invalid input returns HTTP 400 with descriptive error message

## Acceptance Criteria

- [ ] `user@.com` is rejected as invalid email
- [ ] Age 12 returns 400 error
- [ ] Age 13 returns 201 (boundary case)
- [ ] Valid registration returns 201 (not 200)
- [ ] All 8 unit tests pass
- [ ] Error messages are descriptive (not just "invalid")

## Design Notes

See `docs/DESIGN.md` for the validation architecture.
See `.context/pr_comments.md` for Priya's original code review.

---

### 💡 Slack Thread — #backend-bugs — Feb 15, 2026

**@sarah.kim (QA)** 10:30 AM:
> "We're seeing 47 registrations from users with age < 13 in the last hour.
> Also getting accounts with clearly invalid emails like `test@.com`."

**@priya.nair (Dev, on leave)** 10:45 AM:
> "Oh no. I think the email regex is missing the domain check. And the age
> comparison might be using `<` instead of `<=` or vice versa. Sorry, I
> should have caught that before going on leave."

**@nisha.gupta (Tech Lead)** 10:50 AM:
> "@intern can you take PLATFORM-3001? Should be quick — just fix the
> validation checks. Priya's hints in Slack should help. Make sure all
> tests pass before you push."

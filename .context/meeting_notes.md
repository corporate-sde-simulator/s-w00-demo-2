# Meeting Notes — Sprint 24 Planning

**Date:** Feb 15, 2026
**Attendees:** Nisha (TL), Sarah (QA), Raj, Priya (remote), You (Intern)

---

## Registration Bugs

- **Sarah:** The mobile team deployed yesterday and now we're getting invalid signups.
  47 underage users, some emails like `test@.com`. Priya's validation code has issues.

- **Priya (on Slack):** I think it's three things: the email regex, the age check boundary,
  and the status code. I left `// BUG:` comments when I realized but didn't have time to fix.

- **Nisha:** @Intern, take PLATFORM-3001. Priya's comments in the code should make it
  straightforward. All three bugs are in `registrationValidator.js`.

## Action Items

- [ ] @You — Fix validation bugs (PLATFORM-3001)
- [ ] @Sarah — Re-run QA suite after merge
- [ ] @Raj — Code review

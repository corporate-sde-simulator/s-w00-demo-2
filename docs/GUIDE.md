# Learning Guide — JavaScript (Node.js)

> **Welcome to Demo Task 2!**
> This task simulates a real corporate sprint task with JIRA tickets and Slack threads.

---

## What You Need To Do

1. **Read** `TICKET.md` — notice the JIRA format, Slack thread, and acceptance criteria
2. **Read** the Slack thread — Priya's hints tell you exactly what's wrong
3. **Open** `src/registrationValidator.js` — find the 3 `// BUG:` comments
4. **Fix** each bug
5. **Run tests:** `npx jest tests/ --verbose`

---

## JavaScript Quick Reference

### Regex (Regular Expressions)
`javascript
// Test if string matches pattern
const regex = /^[a-z]+@[a-z]+\.[a-z]{2,}$/;
regex.test("user@site.com");  // true

// Common patterns:
// [^@]+    = one or more characters that aren't @
// [a-z]+   = one or more lowercase letters
// \.       = literal dot
// {2,}     = two or more of the previous
`

### Comparison Operators
`javascript
age < 13     // true if age is 12 or less
age <= 13    // true if age is 13 or less
age >= 13    // true if age is 13 or more
`

### HTTP Status Codes
`javascript
200  // OK — request succeeded (for reads)
201  // Created — new resource created (for POST)
400  // Bad Request — invalid input
409  // Conflict — resource already exists
`

### Module Exports
`javascript
module.exports = MyClass;                    // Export one thing
module.exports = { ClassA, ClassB };         // Export multiple
const MyClass = require('./myModule');       // Import
`

---

## Bugs to Fix

### Bug #1: Email regex allows `user@.com`
The regex `/^[^@]+@[^@]*\.[a-zA-Z]{2,}$/` uses `[^@]*` after the @,
which allows zero characters before the dot. Change `*` to `+`.

### Bug #2: Age validation is off-by-one
`age < this.MIN_AGE - 1` means 12-year-olds pass. Should be `age < this.MIN_AGE`.

### Bug #3: Wrong HTTP status code
Returns 200 instead of 201 on success. Change to 201.

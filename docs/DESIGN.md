# ADR-003: Input Validation Architecture

**Date:**
**Status:** Accepted
**Authors:** Nisha Gupta, Priya Nair

## Decision

Validation logic lives in a dedicated `RegistrationValidator` class, separate from
the `RegistrationService`. The service delegates to the validator.

## Rationale

- Single Responsibility: service handles flow, validator handles rules
- Testable: validator can be unit-tested independently
- Extensible: new validation rules don't require service changes

## Validation Rules

| Field | Rule | Error Code |
|-------|------|------------|
| email | Must match `user@domain.tld` format | 400 |
| password | ≥ 8 chars, ≥ 1 number | 400 |
| age | ≥ 13 (COPPA) | 400 |
| (duplicate email) | Checked by service, not validator | 409 |

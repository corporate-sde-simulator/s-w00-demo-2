/**
 * Registration Validator — validates user registration input.
 *
 * Validates email format, password strength, and age compliance.
 *
 * Author: Priya Nair
 * Last Modified: 2026-01-28
 */

class RegistrationValidator {
    constructor() {
        this.MIN_PASSWORD_LENGTH = 8;
        this.MIN_AGE = 13;  // COPPA compliance
    }

    /**
     * Validate a full registration request.
     * Returns { valid: boolean, errors: string[], statusCode: number }
     */
    validate(data) {
        const errors = [];

        // Validate email
        const emailResult = this.validateEmail(data.email);
        if (!emailResult.valid) {
            errors.push(emailResult.error);
        }

        // Validate password
        const passwordResult = this.validatePassword(data.password);
        if (!passwordResult.valid) {
            errors.push(passwordResult.error);
        }

        // Validate age
        const ageResult = this.validateAge(data.age);
        if (!ageResult.valid) {
            errors.push(ageResult.error);
        }

        if (errors.length > 0) {
            return { valid: false, errors, statusCode: 400 };
        }

        // BUG: Returns 200 instead of 201 for successful creation.
        // HTTP 201 means "Created" — the correct code for new resource creation.
        // HTTP 200 means "OK" — used for reads/updates, not creation.
        return { valid: true, errors: [], statusCode: 200 };
    }

    /**
     * Validate email format.
     */
    validateEmail(email) {
        if (!email || typeof email !== 'string') {
            return { valid: false, error: 'Email is required' };
        }

        // BUG: This regex doesn't require characters before the @ or a proper domain.
        // It matches "user@.com" because [^@]+ only checks the part BEFORE @,
        // but after @ it accepts "." immediately with no domain name.
        // The part after @ should require at least one character before the dot.
        const emailRegex = /^[^@]+@[^@]*\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return { valid: false, error: 'Invalid email format' };
        }

        return { valid: true };
    }

    /**
     * Validate password strength.
     */
    validatePassword(password) {
        if (!password || typeof password !== 'string') {
            return { valid: false, error: 'Password is required' };
        }

        if (password.length < this.MIN_PASSWORD_LENGTH) {
            return {
                valid: false,
                error: Password must be at least  characters,
            };
        }

        // Check for at least one number
        if (!/\d/.test(password)) {
            return { valid: false, error: 'Password must contain at least one number' };
        }

        return { valid: true };
    }

    /**
     * Validate age — must be >= 13 for COPPA compliance.
     */
    validateAge(age) {
        if (age === undefined || age === null) {
            return { valid: false, error: 'Age is required' };
        }

        if (typeof age !== 'number' || !Number.isInteger(age)) {
            return { valid: false, error: 'Age must be a whole number' };
        }

        // BUG: Uses strict less-than (<) instead of less-than-or-equal (<=).
        // This means age 12 gets through because 12 < 12 is false.
        // Should be: age < this.MIN_AGE (which is 13), rejecting 12 and below.
        // Currently: age < 12 — so 12-year-olds pass the check.
        if (age < this.MIN_AGE - 1) {
            return {
                valid: false,
                error: Must be at least  years old,
            };
        }

        return { valid: true };
    }
}

module.exports = RegistrationValidator;

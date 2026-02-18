/**
 * Tests for Registration Validator.
 * Run with: npx jest tests/ --verbose
 */

const RegistrationValidator = require('../src/registrationValidator');

describe('RegistrationValidator', () => {
    let validator;

    beforeEach(() => {
        validator = new RegistrationValidator();
    });

    // ── Email Tests ──
    test('valid email passes', () => {
        const result = validator.validateEmail('user@example.com');
        expect(result.valid).toBe(true);
    });

    test('email with no domain rejects', () => {
        const result = validator.validateEmail('user@.com');
        expect(result.valid).toBe(false);
    });

    test('email with no @ rejects', () => {
        const result = validator.validateEmail('userexample.com');
        expect(result.valid).toBe(false);
    });

    // ── Password Tests ──
    test('valid password passes', () => {
        const result = validator.validatePassword('secure123');
        expect(result.valid).toBe(true);
    });

    test('short password rejects', () => {
        const result = validator.validatePassword('short1');
        expect(result.valid).toBe(false);
    });

    // ── Age Tests ──
    test('age 13 passes (boundary)', () => {
        const result = validator.validateAge(13);
        expect(result.valid).toBe(true);
    });

    test('age 12 rejects', () => {
        const result = validator.validateAge(12);
        expect(result.valid).toBe(false);
    });

    // ── Full Validation ──
    test('valid registration returns 201', () => {
        const result = validator.validate({
            email: 'test@example.com',
            password: 'password123',
            age: 25,
        });
        expect(result.valid).toBe(true);
        expect(result.statusCode).toBe(201);
    });
});

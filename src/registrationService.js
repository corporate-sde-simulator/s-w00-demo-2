/**
 * Registration Service — handles user registration flow.
 *
 * This file is WORKING correctly. Don't modify it.
 * It uses the RegistrationValidator to check input before saving.
 *
 * Author: Nisha Gupta (Tech Lead)
 */

const RegistrationValidator = require('./registrationValidator');

class RegistrationService {
    constructor(database) {
        this.validator = new RegistrationValidator();
        this.db = database || new InMemoryDB();
    }

    async register(userData) {
        // Step 1: Validate input
        const validation = this.validator.validate(userData);
        if (!validation.valid) {
            return {
                success: false,
                statusCode: validation.statusCode,
                errors: validation.errors,
            };
        }

        // Step 2: Check if email already exists
        const existing = this.db.findByEmail(userData.email);
        if (existing) {
            return {
                success: false,
                statusCode: 409,
                errors: ['Email already registered'],
            };
        }

        // Step 3: Save user
        const user = this.db.save({
            email: userData.email,
            age: userData.age,
            createdAt: new Date().toISOString(),
        });

        return {
            success: true,
            statusCode: validation.statusCode,
            user: { id: user.id, email: user.email },
        };
    }
}

class InMemoryDB {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }

    findByEmail(email) {
        return this.users.find((u) => u.email === email);
    }

    save(user) {
        user.id = this.nextId++;
        this.users.push(user);
        return user;
    }
}

module.exports = { RegistrationService, InMemoryDB };

import { check } from 'express-validator';

export const signupValidator = [
    check('email').isEmail().withMessage('Please provide a valid email address'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];
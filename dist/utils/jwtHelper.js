"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// src/utils/jwtHelper.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for signing tokens (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
// Function to generate a JWT token
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null; // Token verification failed
    }
};
exports.verifyToken = verifyToken;

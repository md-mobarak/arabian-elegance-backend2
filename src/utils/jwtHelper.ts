// src/utils/jwtHelper.ts
import jwt from 'jsonwebtoken';

// Secret key for signing tokens (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; 

// Function to generate a JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Token verification failed
  }
};

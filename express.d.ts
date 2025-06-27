// types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Add any custom properties you need (like authenticated user data)
    }
  }
}

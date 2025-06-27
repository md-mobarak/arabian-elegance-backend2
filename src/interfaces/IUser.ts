

// // Define the interface for the user model (extending Document)
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: "admin" | "user" | "manager";
//   phone: number;
//   district: string;
//   thana: string;
//   village: string;
//   avatar: string;
//   isVerified: boolean;
//   comparePassword(enteredPassword: string): Promise<boolean>;
//   getJwtToken?(): string;
// }
// interfaces/IUser.ts
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: number;
  district: string;
  thana: string;
  village: string;
  avatar: string;
  isVerified: boolean;

  // Methods for JWT generation
  getJwtToken(): string;
  getRefreshToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}


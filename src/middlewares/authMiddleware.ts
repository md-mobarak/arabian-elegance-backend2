


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../module/user/userModel";


export const protect = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

      //  console.log(token);
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return; // Exit function
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id).select("-password");
      // console.log(decoded,'it is user',user)
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: "Not authorized" });
      return;
    }
    next();
  };
};

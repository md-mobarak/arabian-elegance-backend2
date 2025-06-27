"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../module/user/userModel"));
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        //  console.log(token);
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return; // Exit function
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await userModel_1.default.findById(decoded.id).select("-password");
        // console.log(decoded,'it is user',user)
        if (!user) {
            res.status(401).json({ success: false, message: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ success: false, message: "Not authorized" });
            return;
        }
        next();
    };
};
exports.authorize = authorize;

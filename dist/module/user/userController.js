"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const userService = __importStar(require("./userService"));
// Register user
const registerUserController = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await userService.loginUser(email, password);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        // console.log(user)
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            accessToken,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
// // Get all users with pagination, search, and filter
// const getAllUsersController = async (req: Request, res: Response) => {
//   try {
//     const { page = 1, limit = 10, search = "", ...filters } = req.query;
//     const { users, totalUsers, totalPages } = await userService.getAllUsers(
//       Number(page),
//       Number(limit),
//       filters,
//       search as string
//     );
//     res.status(200).json({
//       success: true,
//       data: users,
//       pagination: { totalUsers, totalPages, currentPage: page },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error });
//   }
// };
const getAllUsersController = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", ...filters } = req.query;
        // নিউমেরিক কনভার্শন নিশ্চিত করুন
        const parsedPage = Math.max(Number(page), 1);
        const parsedLimit = Math.max(Number(limit), 1);
        // ফিল্টার থেকে আনওয়ান্টেড ফিল্ড রিমুভ করুন
        const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([key]) => ["role", "isVerified"].includes(key)));
        const { users, totalUsers, totalPages } = await userService.getAllUsers(parsedPage, parsedLimit, cleanFilters, search);
        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: parsedPage,
                itemsPerPage: parsedLimit
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
// Get single user by ID
const getUserByIdController = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
// // Update user
// const updateUserController = async (req: Request, res: Response) => {
//   try {
//     const user = await userService.updateUser(req.params.id, req.body);
//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error });
//   }
// };
// Update user (including role change) - Ensure admin can update roles
const updateUserController = async (req, res) => {
    try {
        const { role } = req.body;
        // Ensure the admin cannot demote themselves to a lower role
        if (req.user.role === "admin" && role !== "admin") {
            throw new Error("Admin role cannot be changed to non-admin.");
        }
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
// Delete user
const deleteUserController = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
exports.userControllers = {
    registerUserController,
    loginUserController,
    deleteUserController,
    updateUserController,
    getUserByIdController,
    getAllUsersController,
};

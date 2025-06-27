"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const userController_1 = require("./userController");
const router = express_1.default.Router();
// Register user (accessible by anyone)
router.post("/register", userController_1.userControllers.registerUserController);
// Login user (accessible by anyone)
router.post("/login", userController_1.userControllers.loginUserController);
// Get all users (accessible by admin)
// protect, authorize("admin")
router.get("/", userController_1.userControllers.getAllUsersController);
// Get user by ID (accessible by the user themselves or admin)
router.get("/:id", authMiddleware_1.protect, userController_1.userControllers.getUserByIdController);
// Update user (accessible by the user themselves or admin)
router.put("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin"), userController_1.userControllers.updateUserController);
// Delete user (accessible by admin only)
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin"), userController_1.userControllers.deleteUserController);
exports.userRouter = router;

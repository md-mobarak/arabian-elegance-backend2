import express from "express";
import { authorize, protect } from "../../middlewares/authMiddleware";
import {  userControllers } from "./userController";

const router = express.Router();

// Register user (accessible by anyone)
router.post("/register", userControllers.registerUserController);

// Login user (accessible by anyone)
router.post("/login", userControllers.loginUserController);

// Get all users (accessible by admin)
// protect, authorize("admin")
router.get("/",  userControllers.getAllUsersController);

// Get user by ID (accessible by the user themselves or admin)
router.get("/:id", protect, userControllers.getUserByIdController);

// Update user (accessible by the user themselves or admin)
router.put("/:id", protect, authorize("admin"), userControllers.updateUserController);

// Delete user (accessible by admin only)
router.delete("/:id", protect, authorize("admin"), userControllers.deleteUserController);

export const userRouter = router;
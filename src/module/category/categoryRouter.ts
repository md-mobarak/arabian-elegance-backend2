
// Router
import express from "express";
import { CategoryController } from "./categoryController";
import { authorize, protect } from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/",protect, authorize("admin", "manager"), CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id",protect, authorize("admin", "manager"), CategoryController.updateCategory);
router.delete("/:id",protect, authorize("admin", "manager"), CategoryController.deleteCategory);

export const  categoryRouter= router;
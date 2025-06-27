"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
// Router
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("./categoryController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin", "manager"), categoryController_1.CategoryController.createCategory);
router.get("/", categoryController_1.CategoryController.getAllCategories);
router.get("/:id", categoryController_1.CategoryController.getCategoryById);
router.put("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin", "manager"), categoryController_1.CategoryController.updateCategory);
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin", "manager"), categoryController_1.CategoryController.deleteCategory);
exports.categoryRouter = router;

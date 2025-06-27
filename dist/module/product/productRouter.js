"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const productController_1 = require("./productController");
const multer_1 = __importDefault(require("../../middlewares/multer"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin", "manager"), multer_1.default.array("images", 5), productController_1.productControllers.createProduct);
router.get("/", productController_1.productControllers.getProducts);
router.get("/:id", productController_1.productControllers.getProductById);
router.put("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin", "manager"), multer_1.default.array("images", 5), productController_1.productControllers.updateProduct);
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin"), productController_1.productControllers.deleteProduct);
exports.productRouter = router;

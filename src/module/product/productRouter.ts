
import express from "express";
import { protect, authorize } from "../../middlewares/authMiddleware";
import { productControllers } from "./productController";
import upload from "../../middlewares/multer";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), upload.array("images", 5), productControllers.createProduct);
router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProductById);
router.put("/:id", protect, authorize("admin", "manager"),upload.array("images", 5), productControllers.updateProduct);
router.delete("/:id", protect, authorize("admin"), productControllers.deleteProduct);

export const  productRouter= router;

import { Router } from "express";
import * as datasetController from "../controllers/dataset.controller";
import { verifyToken, requireRole } from "../middleware/VerifyToken";
import { uploadThumbnail } from "../utils/upload";

const router = Router();

// 🟢 Public: ai cũng xem được dataset
router.get("/", datasetController.getAll);
router.get("/:id", datasetController.getById);

// 🔒 Seller/Admin: có quyền quản lý dataset
router.post("/", verifyToken, requireRole(["seller", "admin"]), uploadThumbnail, datasetController.create);
router.put("/:id", verifyToken, requireRole(["seller", "admin"]), uploadThumbnail, datasetController.update);
router.delete("/:id", verifyToken, requireRole(["seller", "admin"]), datasetController.remove);

export default router;

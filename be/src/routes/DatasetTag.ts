import { Router } from "express";
import * as DatasetTagController from "../controllers/DatasetTag.controller";
import { verifyToken, requireRole } from "../middleware/VerifyToken";

const router = Router();

// 📌 Lấy tất cả dataset-tags
router.get("/", verifyToken, requireRole(["seller", "admin"]), DatasetTagController.getAll);

// 📌 Thêm tag cho dataset
router.post("/", verifyToken, requireRole(["seller", "admin"]), DatasetTagController.addTagToDataset);

// 📌 Xóa tag khỏi dataset
router.delete("/", verifyToken, requireRole(["seller", "admin"]), DatasetTagController.removeTagFromDataset);

// 📌 Update tag cho dataset
router.put("/", verifyToken, requireRole(["seller", "admin"]), DatasetTagController.updateDatasetTag);

export default router;

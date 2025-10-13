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

// 🧩 Seller: lấy tất cả dataset của chính mình
router.get("/seller/:sellerId", datasetController.getBySellerId);
// 🧩 Seller: lấy tất cả dataset của chính mình theo tên (tìm kiếm gần đúng)
router.get("/seller/name/:sellerName", datasetController.getBySellerName);
export default router;

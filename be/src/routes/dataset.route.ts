import { Router } from "express";
import * as datasetController from "../controllers/dataset.controller";
import { verifyToken, requireRole } from "../middleware/VerifyToken";

const router = Router();

// 🟢 Public: buyer/seller/admin đều xem được datasets
router.get("/", datasetController.getAll);
router.get("/:id", datasetController.getById);

// 🔒 Seller hoặc Admin mới được quản lý dataset
router.post("/", verifyToken, requireRole(["seller", "admin"]), datasetController.create);
router.put("/:id", verifyToken, requireRole(["seller", "admin"]), datasetController.update);
router.delete("/:id", verifyToken, requireRole(["seller", "admin"]), datasetController.remove);

export default router;

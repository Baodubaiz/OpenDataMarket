import { Router } from "express";
import * as tagController from "../controllers/Tag.controller";
import { verifyToken, requireRole } from "../middleware/VerifyToken";

const router = Router();

// GET all tags (public)
router.get("/", tagController.getAll);

// GET one tag
router.get("/:id", tagController.getById);

// CREATE tag (seller, admin)
router.post("/", verifyToken, requireRole(["seller", "admin"]), tagController.create);

// UPDATE tag (seller, admin)
router.put("/:id", verifyToken, requireRole(["seller", "admin"]), tagController.update);

// DELETE tag (admin only)
router.delete("/:id", verifyToken, requireRole(["admin"]), tagController.remove);

export default router;

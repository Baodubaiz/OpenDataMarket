import { Router } from "express";
import * as datasetController from "../controllers/Dataset.controller";
import { verifyToken, requireRole } from "../middleware/VerifyToken";

const router = Router();

// GET all dataset (public)
router.get("/", datasetController.getAll);

// GET one dataset
router.get("/:id", datasetController.getById);

// CREATE dataset (seller, admin)
router.post("/", verifyToken, requireRole(["seller", "admin"]), datasetController.create);

// UPDATE dataset (seller, admin)
router.put("/:id", verifyToken, requireRole(["seller", "admin"]), datasetController.update);

// DELETE dataset (seller, admin)
router.delete("/:id", verifyToken, requireRole(["seller", "admin"]), datasetController.remove);

export default router;

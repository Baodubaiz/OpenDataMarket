import { Router } from "express";
import * as reviewController from "../controllers/review.controller";
import { verifyToken, requireRole } from "../middleware/VerifyToken";

const router = Router();

// GET all reviews (ai cũng xem được → public)
router.get("/", reviewController.getAll);

// GET one review
router.get("/:id", reviewController.getById);

// CREATE review (buyer)
router.post("/", verifyToken, requireRole(["buyer"]), reviewController.create);

// UPDATE review (buyer)
router.put("/:id", verifyToken, requireRole(["buyer"]), reviewController.update);

// DELETE review (buyer chỉ xóa của mình, admin toàn quyền)
router.delete("/:id", verifyToken, requireRole(["buyer", "admin"]), reviewController.remove);

export default router;

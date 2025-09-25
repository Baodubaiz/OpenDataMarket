import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/VerifyToken";

const router = express.Router();
const prisma = new PrismaClient();

// Lấy tất cả reviews
router.get("/", verifyToken, async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: { buyer: true, dataset: true },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy reviews" });
  }
});

// Lấy review theo ID
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { review_id: id },
      include: { buyer: true, dataset: true },
    });
    if (!review) return res.status(404).json({ error: "Không tìm thấy review" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy review" });
  }
});

// Tạo mới review
router.post("/", verifyToken, async (req, res) => {
  const { buyer_id, dataset_id, rating, comment } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { buyer_id, dataset_id, rating, comment },
    });
    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi tạo review" });
  }
});

// Cập nhật review
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const updated = await prisma.review.update({
      where: { review_id: id },
      data: { rating, comment },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật review" });
  }
});

// Xóa review
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { review_id: id },
    });
    res.json({ message: "Xóa review thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa review" });
  }
});

export default router;

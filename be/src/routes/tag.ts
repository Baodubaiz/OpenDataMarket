import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/VerifyToken";


const router = express.Router();
const prisma = new PrismaClient();

// Lấy tất cả tags
router.get("/", verifyToken, async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy tags" });
  }
});

// Lấy tag theo ID
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await prisma.tag.findUnique({
      where: { tag_id: id },
    });
    if (!tag) return res.status(404).json({ error: "Không tìm thấy tag" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy tag" });
  }
});

// Tạo mới tag
router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  try {
    const newTag = await prisma.tag.create({
      data: { name },
    });
    res.json(newTag);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi tạo tag" });
  }
});

// Cập nhật tag
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await prisma.tag.update({
      where: { tag_id: id },
      data: { name },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật tag" });
  }
});

// Xóa tag
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tag.delete({
      where: { tag_id: id },
    });
    res.json({ message: "Xóa tag thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa tag" });
  }
});

export default router;

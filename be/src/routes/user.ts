// src/routes/user.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/VerifyToken";

const router = Router();
const prisma = new PrismaClient();

/**
 * 1. Get tất cả user (chỉ admin mới xem được)
 */
router.get("/", verifyToken, async (req: any, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Không có quyền" });
  }
  const users = await prisma.user.findMany();
  res.json(users);
});

/**
 * 2. Get user theo ID
 */
router.get("/:id", verifyToken, async (req: any, res) => {
  const userId = req.params.id;
  if (req.user.role !== "admin" && req.user.user_id !== userId) {
    return res.status(403).json({ message: "Không có quyền" });
  }

  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

  res.json(user);
});

/**
 * 3. Tạo user mới (public: đăng ký)
 */
router.post("/", async (req, res) => {
  const { full_name, email, password, role } = req.body;

  const newUser = await prisma.user.create({
    data: {
      full_name,
      email,
      password,
      role: role || "buyer", // mặc định là buyer
    },
  });

  res.json(newUser);
});

/**
 * 4. Update user (self hoặc admin)
 */
router.put("/:id", verifyToken, async (req: any, res) => {
  const userId = req.params.id;
  if (req.user.role !== "admin" && req.user.user_id !== userId) {
    return res.status(403).json({ message: "Không có quyền sửa" });
  }

  const updated = await prisma.user.update({
    where: { user_id: userId },
    data: req.body,
  });

  res.json(updated);
});

/**
 * 5. Xóa user (admin only)
 */
router.delete("/:id", verifyToken, async (req: any, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Không có quyền xoá" });
  }

  const userId = req.params.id;
  await prisma.user.delete({
    where: { user_id: userId },
  });

  res.json({ message: "User đã bị xoá" });
});

export default router;

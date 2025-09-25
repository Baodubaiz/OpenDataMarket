import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/VerifyToken";

const prisma = new PrismaClient();
const router = Router();

/**
 * GET all transactions
 */
router.get("/transactions", verifyToken, async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { order: true }, // lấy cả order liên quan
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy transactions" });
  }
});

/**
 * GET transaction by ID
 */
router.get("/transactions/:id", verifyToken, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { transaction_id: req.params.id },
      include: { order: true },
    });
    if (!transaction) return res.status(404).json({ error: "Không tìm thấy transaction" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy transaction" });
  }
});

/**
 * POST create new transaction
 */
router.post("/transactions", verifyToken, async (req, res) => {
  try {
    const { order_id, tx_hash, bank_ref, status } = req.body;
    const newTransaction = await prisma.transaction.create({
      data: { order_id, tx_hash, bank_ref, status },
    });
    res.json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi tạo transaction" });
  }
});

/**
 * PUT update transaction
 */
router.put("/transactions/:id", verifyToken, async (req, res) => {
  try {
    const { status, tx_hash, bank_ref } = req.body;
    const updated = await prisma.transaction.update({
      where: { transaction_id: req.params.id },
      data: { status, tx_hash, bank_ref },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật transaction" });
  }
});

/**
 * DELETE transaction
 */
router.delete("/transactions/:id", verifyToken, async (req, res) => {
  try {
    await prisma.transaction.delete({
      where: { transaction_id: req.params.id },
    });
    res.json({ message: "Xóa transaction thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa transaction" });
  }
});

export default router;

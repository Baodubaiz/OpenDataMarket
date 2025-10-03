import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { AuthRequest } from "../middleware/VerifyToken";

// 📌 Lấy tất cả order (admin xem tất cả, buyer/seller chỉ xem order liên quan)
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await orderService.getAll(req.user!);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Lấy order theo id
export const getById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.getById(req.params.id, req.user!);
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Tạo order (buyer)
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can create orders" });
    }
    const newOrder = await orderService.create(req.body, req.user.user_id);
    res.json(newOrder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Cập nhật order (admin có thể chỉnh sửa status, seller chỉ xem)
export const update = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await orderService.update(req.params.id, req.body, req.user!);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Xóa order (admin)
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await orderService.remove(req.params.id);
    res.json(deleted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

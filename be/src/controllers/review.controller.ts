import { Request, Response } from "express";
import * as reviewService from "../services/review.service";
import { AuthRequest } from "../middleware/VerifyToken";

// 📌 Lấy tất cả review (public, nhưng seller chỉ nên thấy review dataset của mình)
export const getAll = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAll();
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Lấy review theo id
export const getById = async (req: Request, res: Response) => {
  try {
    const review = await reviewService.getById(req.params.id);
    res.json(review);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Tạo review (buyer)
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can create reviews" });
    }
    const newReview = await reviewService.create({
      ...req.body,
      buyer_id: req.user.user_id, // gắn luôn buyer từ token
    });
    res.json(newReview);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Cập nhật review (buyer chỉ được sửa của mình)
export const update = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can update reviews" });
    }
    const updated = await reviewService.update(req.params.id, req.body, req.user.user_id);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Xóa review (admin toàn quyền, buyer chỉ xóa của mình)
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await reviewService.remove(req.params.id, req.user!);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

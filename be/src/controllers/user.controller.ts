// controllers/user.controller.ts
import { Request, Response } from "express";
import * as userService from "../services/user.services";

// Lấy tất cả user (chỉ admin mới được gọi, check ở route)
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy user theo id
export const getById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(req.params.id);

    // Nếu là buyer/seller chỉ được xem chính mình
    if (["buyer", "seller"].includes((req as any).user.role) && (req as any).user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden: cannot view others" });
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo user (register)
export const create = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.create(req.body);
    res.json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const update = async (req: Request, res: Response) => {
  try {
    if (["buyer", "seller"].includes((req as any).user.role) && (req as any).user.user_id !== req.params.id) {
      console.log("Forbidden update attempt by", (req as any).user.user_id);
      return res.status(403).json({ message: "Forbidden: cannot update others" });
    }

    const updatedUser = await userService.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user (admin only)
export const remove = async (req: Request, res: Response) => {
  try {
    const deletedUser = await userService.remove(req.params.id);
    res.json(deletedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

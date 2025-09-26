import { Request, Response } from "express";
import * as categoryService from "../services/Category.service";

// 📌 Lấy tất cả category
export const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Lấy category theo id
export const getById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getById(req.params.id);
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Tạo category (admin)
export const create = async (req: Request, res: Response) => {
  try {
    const newCategory = await categoryService.create(req.body);
    res.json(newCategory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update category (admin)
export const update = async (req: Request, res: Response) => {
  try {
    const updated = await categoryService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Delete category (admin)
export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await categoryService.remove(req.params.id);
    res.json(deleted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

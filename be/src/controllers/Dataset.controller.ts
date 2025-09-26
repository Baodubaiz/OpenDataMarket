import { Request, Response } from "express";
import * as datasetService from "../services/Dataset.service";
import { AuthRequest } from "../middleware/VerifyToken";

// 📌 Lấy tất cả dataset (public)
export const getAll = async (req: Request, res: Response) => {
  try {
    const datasets = await datasetService.getAll();
    res.json(datasets);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Lấy dataset theo id
export const getById = async (req: Request, res: Response) => {
  try {
    const dataset = await datasetService.getById(req.params.id);
    res.json(dataset);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Tạo dataset (seller, admin)
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (!["seller", "admin"].includes(req.user!.role)) {
      return res.status(403).json({ message: "Only sellers or admins can create dataset" });
    }

    const newDataset = await datasetService.create({
      ...req.body,
      seller_id: req.user!.user_id, // gắn seller_id từ token
    });

    res.json(newDataset);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update dataset (seller chỉ được update của mình, admin toàn quyền)
export const update = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await datasetService.update(req.params.id, req.body, req.user!);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Xóa dataset (seller chỉ xóa của mình, admin toàn quyền)
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await datasetService.remove(req.params.id, req.user!);
    res.json(deleted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

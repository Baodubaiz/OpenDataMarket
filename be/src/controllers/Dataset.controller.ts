import { Request, Response } from "express";
import * as datasetService from "../services/dataset.service";
import { AuthRequest } from "../middleware/VerifyToken";

// Seller tạo dataset
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    // console.log("📥 Body nhận được từ client:", req.body);
    const dataset = await datasetService.create(req.user.user_id, req.body);
    res.json(dataset);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy tất cả datasets
export const getAll = async (_req: Request, res: Response) => {
  const datasets = await datasetService.getAll();
  res.json(datasets);
};

// Lấy dataset theo ID
export const getById = async (req: Request, res: Response) => {
  const dataset = await datasetService.getById(req.params.id);
  if (!dataset) return res.status(404).json({ error: "Dataset not found" });
  res.json(dataset);
};

// Cập nhật dataset (chỉ seller owner hoặc admin)
export const update = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const dataset = await datasetService.update(req.params.id, req.user, req.body);
    res.json(dataset);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Xoá dataset
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    await datasetService.remove(req.params.id, req.user);
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

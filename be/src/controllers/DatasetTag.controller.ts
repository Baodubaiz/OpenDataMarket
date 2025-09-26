// src/controllers/DatasetTag.controller.ts
import { Request, Response } from "express";
import * as DatasetTagService from "../services/DatasetTag.service";

// 📌 Lấy tất cả dataset-tag
export const getAll = async (req: Request, res: Response) => {
  try {
    const tags = await DatasetTagService.getAll(); // ✅ bỏ req
    res.json(tags);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Thêm tag cho dataset
export const addTagToDataset = async (req: Request, res: Response) => {
  try {
    const { dataset_id, tag_id } = req.body;
    const newTag = await DatasetTagService.addTagToDataset(dataset_id, tag_id);
    res.json(newTag);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Xóa tag khỏi dataset
export const removeTagFromDataset = async (req: Request, res: Response) => {
  try {
    const { dataset_id, tag_id } = req.body;
    const deleted = await DatasetTagService.removeTagFromDataset(dataset_id, tag_id);
    res.json(deleted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update tag cho dataset
export const updateDatasetTag = async (req: Request, res: Response) => {
  try {
    const { dataset_id, old_tag_id, new_tag_id } = req.body;
    const updated = await DatasetTagService.updateDatasetTag(dataset_id, old_tag_id, new_tag_id);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

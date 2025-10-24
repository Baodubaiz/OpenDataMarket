import { Request, Response } from "express";
import * as datasetService from "../services/dataset.service";
import { AuthRequest } from "../middleware/VerifyToken";

// 🟢 Seller tạo dataset
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    // 📦 Lấy file từ req.files (multer.fields)
    const files = req.files as {
      thumbnail_url?: Express.Multer.File[];
      file_url?: Express.Multer.File[];
    };

    const thumbnail = files?.thumbnail_url?.[0];
    const datasetFile = files?.file_url?.[0];

    // ⚙️ Xử lý body
    const body = {
      ...req.body,
      price_vnd: Number(req.body.price_vnd) || 0,
      price_eth: Number(req.body.price_eth) || 0,
      is_active: req.body.is_active === "true",
      thumbnail_url: thumbnail ? `/upload/thumbnails/${thumbnail.filename}` : null,
      file_url: datasetFile ? `/upload/datasets/${datasetFile.filename}` : null,
    };

    // 💾 Gọi service lưu vào DB
    const dataset = await datasetService.create(req.user.user_id, body);

    res.status(201).json(dataset);
  } catch (err: any) {
    console.error("❌ Lỗi tạo dataset:", err);
    res.status(400).json({ error: err.message });
  }
};




// 🟢 Lấy tất cả datasets
export const getAll = async (_req: Request, res: Response) => {
  const datasets = await datasetService.getAll();
  res.json(datasets);
};

// 🟢 Lấy tất cả datasets active
export const getAllActive = async (_req: Request, res: Response) => {
  const datasets = await datasetService.getAllActive();
  res.json(datasets);
};

// 🟢 Lấy dataset theo ID
export const getById = async (req: Request, res: Response) => {
  const dataset = await datasetService.getById(req.params.id);
  if (!dataset) return res.status(404).json({ error: "Dataset not found" });
  res.json(dataset);
};

// 🟢 Lấy tất cả dataset theo seller_id
export const getBySellerId = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const datasets = await datasetService.getBySellerId(sellerId);

    if (!datasets || datasets.length === 0)
      return res.status(404).json({ message: "Seller chưa có dataset nào" });

    return res.status(200).json({
      message: "Lấy danh sách dataset của seller thành công",
      data: datasets,
    });
  } catch (error: any) {
    console.error("❌ Lỗi getBySellerId:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// 🟢 Lấy tất cả dataset theo tên seller (tìm kiếm gần đúng, không phân biệt hoa thường)
export const getBySellerName = async (req: Request, res: Response) => {
  try {
    const { sellerName } = req.params;
    const datasets = await datasetService.getBySellerName(sellerName);

    if (!datasets || datasets.length === 0)
      return res.status(404).json({ message: "Không tìm thấy dataset nào của seller này" });

    return res.status(200).json({
      message: "Lấy danh sách dataset theo tên seller thành công",
      data: datasets,
    });
  } catch (error: any) {
    console.error("❌ Lỗi getBySellerName:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// 🟢 Seller cập nhật dataset
export const update = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const datasetId = req.params.id;
    if (!datasetId) return res.status(400).json({ error: "Invalid dataset ID" });

    // 📦 Lấy file từ req.files (multer.fields)
    const files = req.files as {
      thumbnail_url?: Express.Multer.File[];
      file_url?: Express.Multer.File[];
    };

    const thumbnail = files?.thumbnail_url?.[0];
    const datasetFile = files?.file_url?.[0];

    // ⚙️ Xử lý body
    const body = { ...req.body };

    if (body.price_vnd !== undefined) body.price_vnd = Number(body.price_vnd);
    if (body.price_eth !== undefined) body.price_eth = Number(body.price_eth);
    if (body.is_active !== undefined)
      body.is_active = body.is_active === "true" || body.is_active === true;

    // 🖼️ Chỉ cập nhật thumbnail nếu có file mới
    if (thumbnail) {
      body.thumbnail_url = `/upload/thumbnails/${thumbnail.filename}`;
    } else {
      delete body.thumbnail_url; // giữ nguyên cũ
    }

    // 📂 Cập nhật dataset file nếu có file mới
    if (datasetFile) {
      body.file_url = `/upload/datasets/${datasetFile.filename}`;
    } else {
      delete body.file_url; // giữ nguyên cũ
    }

    // 💾 Gọi service cập nhật
    const dataset = await datasetService.update(req.params.id, req.user, body);
    res.json(dataset);
  } catch (err: any) {
    console.error("❌ Lỗi cập nhật dataset:", err);
    res.status(400).json({ error: err.message });
  }
};


// 🟢 Xoá dataset
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    await datasetService.remove(req.params.id, req.user);
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

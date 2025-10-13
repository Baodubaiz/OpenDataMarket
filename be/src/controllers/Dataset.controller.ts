import { Request, Response } from "express";
import * as datasetService from "../services/dataset.service";
import { AuthRequest } from "../middleware/VerifyToken";

// 🟢 Seller tạo dataset
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const thumbnail = (req as any).file;
    const body = { ...req.body };

    // ép kiểu numeric và boolean nếu cần
    body.price_vnd = Number(body.price_vnd) || 0;
    body.price_eth = Number(body.price_eth) || 0;
    body.is_active = body.is_active === "true";

    // thêm đường dẫn thumbnail
    body.thumbnail_url = thumbnail ? `/upload/thumbnails/${thumbnail.filename}` : null;

    const dataset = await datasetService.create(req.user.user_id, body);
    res.json(dataset);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};



// 🟢 Lấy tất cả datasets
export const getAll = async (_req: Request, res: Response) => {
  const datasets = await datasetService.getAll();
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


// 🟢 Cập nhật dataset
export const update = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const thumbnail = (req as any).file;
    const body = { ...req.body };

    // ép kiểu numeric và boolean nếu cần
    if (body.price_vnd !== undefined) body.price_vnd = Number(body.price_vnd);
    if (body.price_eth !== undefined) body.price_eth = Number(body.price_eth);
    if (body.is_active !== undefined)
      body.is_active = body.is_active === "true" || body.is_active === true;

    // chỉ cập nhật thumbnail nếu có upload mới
    if (thumbnail) {
      body.thumbnail_url = `/upload/thumbnails/${thumbnail.filename}`;
    } else {
      delete body.thumbnail_url; // giữ nguyên đường dẫn cũ
    }

    const dataset = await datasetService.update(req.params.id, req.user, body);
    res.json(dataset);
  } catch (err: any) {
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

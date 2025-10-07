import multer from "multer";
import path from "path";
import fs from "fs";

// 🧱 Đảm bảo thư mục tồn tại
const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// 📦 Cấu hình lưu file thumbnail
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        const folder = path.join(__dirname, "../../public/upload/thumbnails");
        ensureDir(folder);
        cb(null, folder);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

// ✅ Chỉ cho phép ảnh
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowed = [".png", ".jpg", ".jpeg", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error("Ảnh thumbnail không hợp lệ (chỉ .png, .jpg, .jpeg, .webp)"));
    cb(null, true);
};

// 🚀 Middleware upload 1 ảnh thumbnail
export const uploadThumbnail = multer({ storage, fileFilter }).single("thumbnail_url");

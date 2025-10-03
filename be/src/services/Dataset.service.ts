import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../middleware/VerifyToken";

const prisma = new PrismaClient();

// 🟢 Seller tạo dataset
export const create = async (sellerId: string, data: any) => {
  // console.log("Creating dataset for seller:", sellerId, "with data:", data);
  return await prisma.dataset.create({
    data: {
      seller_id: sellerId,
      ...data,
    },
  });
};

// Lấy tất cả datasets
export const getAll = async () => {
  return await prisma.dataset.findMany({
    where: { is_active: true },
    include: {
      seller: { select: { user_id: true, full_name: true } },
      category: true,
      tags: true, // 1-n, include trực tiếp là được
      reviews: true,
    },
  });
};

// Lấy dataset theo ID
export const getById = async (id: string) => {
  return await prisma.dataset.findUnique({
    where: { dataset_id: id },
    include: {
      seller: { select: { user_id: true, full_name: true } },
      category: true,
      tags: true, // 1-n, include trực tiếp
      reviews: true,
    },
  });
};


// ✏️ Update dataset (seller chỉ update dataset của mình, admin update tất cả)
export const update = async (id: string, user: UserPayload, data: any) => {
  const dataset = await prisma.dataset.findUnique({ where: { dataset_id: id } });
  if (!dataset) throw new Error("Dataset not found");

  if (user.role !== "admin" && dataset.seller_id !== user.user_id) {
    throw new Error("Forbidden: bạn không phải owner dataset này");
  }

  return await prisma.dataset.update({
    where: { dataset_id: id },
    data,
  });
};

// 🗑 Xoá dataset
export const remove = async (id: string, user: UserPayload) => {
  const dataset = await prisma.dataset.findUnique({ where: { dataset_id: id } });
  if (!dataset) throw new Error("Dataset not found");

  if (user.role !== "admin" && dataset.seller_id !== user.user_id) {
    throw new Error("Forbidden: bạn không phải owner dataset này");
  }

  return await prisma.dataset.delete({ where: { dataset_id: id } });
};

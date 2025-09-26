import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../middleware/VerifyToken";

const prisma = new PrismaClient();

// 📌 Lấy tất cả dataset
export const getAll = async () => {
  return await prisma.dataset.findMany();
};

// 📌 Lấy dataset theo id
export const getById = async (id: string) => {
  return await prisma.dataset.findUnique({
    where: { dataset_id: id },
  });
};

// 📌 Tạo dataset (seller/admin)
export const create = async (data: any) => {
  return await prisma.dataset.create({ data });
};

// 📌 Update dataset
export const update = async (id: string, data: any, user: UserPayload) => {
  const dataset = await prisma.dataset.findUnique({ where: { dataset_id: id } });
  if (!dataset) throw new Error("Dataset not found");

  if (user.role === "seller" && dataset.seller_id !== user.user_id) {
    throw new Error("Not allowed");
  }

  return await prisma.dataset.update({
    where: { dataset_id: id },
    data,
  });
};

// 📌 Xóa dataset
export const remove = async (id: string, user: UserPayload) => {
  const dataset = await prisma.dataset.findUnique({ where: { dataset_id: id } });
  if (!dataset) throw new Error("Dataset not found");

  if (user.role === "seller" && dataset.seller_id !== user.user_id) {
    throw new Error("Not allowed");
  }

  return await prisma.dataset.delete({
    where: { dataset_id: id },
  });
};

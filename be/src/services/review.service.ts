import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../middleware/VerifyToken";

const prisma = new PrismaClient();

// Lấy tất cả review
export const getAll = async () => {
  return await prisma.review.findMany();
};

// Lấy review theo id
export const getById = async (id: string) => {
  return await prisma.review.findUnique({
    where: { review_id: id },
  });
};

// Tạo review
export const create = async (data: any) => {
  return await prisma.review.create({ data });
};

// Cập nhật review (buyer chỉ được sửa review của chính mình)
export const update = async (id: string, data: any, buyerId: string) => {
  const review = await prisma.review.findUnique({ where: { review_id: id } });

  if (!review) throw new Error("Review not found");
  if (review.buyer_id !== buyerId) throw new Error("Not allowed");

  return await prisma.review.update({
    where: { review_id: id },
    data,
  });
};

// Xóa review (admin toàn quyền, buyer chỉ xóa review của mình)
export const remove = async (id: string, user: UserPayload) => {
  const review = await prisma.review.findUnique({ where: { review_id: id } });

  if (!review) throw new Error("Review not found");

  if (user.role !== "admin" && review.buyer_id !== user.user_id) {
    throw new Error("Not allowed");
  }

  return await prisma.review.delete({
    where: { review_id: id },
  });
};

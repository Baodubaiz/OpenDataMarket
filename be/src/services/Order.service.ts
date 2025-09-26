// be/src/services/Order.service.ts
import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../middleware/VerifyToken";

const prisma = new PrismaClient();

export const getAll = async (user: UserPayload) => {
  if (user.role === "admin") {
    return await prisma.order.findMany({ include: { dataset: true } });
  }
  if (user.role === "buyer") {
    return await prisma.order.findMany({
      where: { buyer_id: user.user_id },
      include: { dataset: true },
    });
  }
  if (user.role === "seller") {
    return await prisma.order.findMany({
      where: { dataset: { seller_id: user.user_id } },
      include: { dataset: true },
    });
  }
};

export const getById = async (id: string, user: UserPayload) => {
  const order = await prisma.order.findUnique({
    where: { order_id: id },
    include: { dataset: true },
  });
  if (!order) throw new Error("Order not found");

  if (user.role === "buyer" && order.buyer_id !== user.user_id) {
    throw new Error("Not allowed");
  }
  if (user.role === "seller" && order.dataset.seller_id !== user.user_id) {
    throw new Error("Not allowed");
  }

  return order;
};

export const create = async (data: any, buyerId: string) => {
  return await prisma.order.create({
    data: {
      ...data,
      buyer_id: buyerId,
      status: "pending",
    },
  });
};

export const update = async (id: string, data: any, user: UserPayload) => {
  if (user.role !== "admin") throw new Error("Only admin can update orders");

  return await prisma.order.update({
    where: { order_id: id },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.order.delete({
    where: { order_id: id },
  });
};

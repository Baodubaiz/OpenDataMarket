import axios from "@/lib/axios";
import { Order } from "@/types/index"; // ngài có thể định nghĩa type riêng

// 📌 Lấy tất cả đơn hàng (buyer, seller, admin)
export const getAllOrders = async (token: string) => {
    const res = await axios.get<Order[]>("/orders", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 📌 Lấy 1 đơn hàng theo id
export const getOrderById = async (id: string, token: string) => {
    const res = await axios.get<Order>(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 📌 Tạo đơn hàng (buyer)
export const createOrder = async (data: Partial<Order>, token: string) => {
    const res = await axios.post<Order>("/orders", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 📌 Cập nhật đơn hàng (admin)
export const updateOrder = async (id: string, data: Partial<Order>, token: string) => {
    const res = await axios.put<Order>(`/orders/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 📌 Xóa đơn hàng (admin)
export const deleteOrder = async (id: string, token: string) => {
    const res = await axios.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

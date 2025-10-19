import axios from "@/lib/axios";
import { Dataset } from "@/types/index"; // ngài có thể định nghĩa type riêng

// 📌 Lấy tất cả dataset (public)
export const getAllDatasets = async (token: string) => {
    const res = await axios.get<Dataset[]>("/dataset", {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Datasets fetched:", res.data);
    return res.data;
};

// 📌 Lấy tất cả dataset active (public)
export const getAllActiveDatasets = async () => {
    const res = await axios.get<Dataset[]>("/dataset/active");
    return res.data;
};

// 📌 Lấy dataset theo id (public)
export const getDatasetById = async (id: string) => {
    const res = await axios.get<Dataset>(`/dataset/${id}`);
    return res.data;
};

// 📌 Lấy dataset theo sellerId (public)
export const getDatasetBySellerId = async (id: string) => {
    const res = await axios.get<Dataset[]>(`/dataset/seller/${id}`);
    return res.data;
};
// 📌 Lấy dataset theo tên seller (public)
export const getDatasetBySellerName = async (name: string) => {
    const res = await axios.get<Dataset[]>(`/dataset/seller/name/${name}`);
    return res.data;
};

// 📌 Tạo dataset (seller hoặc admin)
export const createDataset = async (data: Partial<Dataset>, token: string) => {
    const res = await axios.post<Dataset>("/dataset", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 📌 Cập nhật dataset (seller hoặc admin)
export const updateDataset = async (id: string, data: Partial<Dataset>, token: string) => {
    const res = await axios.put<Dataset>(`/dataset/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 📌 Xóa dataset (seller hoặc admin)
export const deleteDataset = async (id: string, token: string) => {
    const res = await axios.delete(`/dataset/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
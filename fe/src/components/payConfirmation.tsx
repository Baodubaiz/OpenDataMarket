"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useDatasetById } from "@/hooks/dataset/useDataset";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentConfirmationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const datasetId = searchParams.get("dataset_id") as string;
    const { data: dataset, isLoading, isError } = useDatasetById(datasetId);

    if (isLoading) return <p className="text-center mt-10 text-white">Đang tải dữ liệu...</p>;
    if (isError || !dataset)
        return <p className="text-center mt-10 text-red-400">Không tìm thấy dataset.</p>;

    // ✅ Khẳng định dataset tồn tại
    const currentDataset = dataset;

    // Xử lý URL ảnh
    const imageUrl = currentDataset.thumbnail_url
        ? `http://localhost:3001${currentDataset.thumbnail_url}`
        : "/placeholder.png";

    return (
        <div className="max-w-4xl mx-auto py-16 min-h-screen flex items-center justify-center px-4">
            {/* Card chính */}
            <Card className="shadow-2xl rounded-2xl overflow-hidden bg-gray-800/90 border border-gray-700 backdrop-blur-sm w-full">
                <CardHeader className="border-b border-gray-700/50 p-6 text-center bg-gray-900/50">
                    <CardTitle className="text-3xl font-extrabold text-white tracking-wide">
                        Hoàn tất Thanh toán 💸
                    </CardTitle>
                    <p className="text-gray-400 text-sm">Vui lòng chuyển khoản để hoàn tất giao dịch.</p>
                </CardHeader>

                <CardContent className="space-y-8 p-8">
                    {/* 💰 Thông tin Tổng tiền - Nổi bật */}
                    <div className="p-5 rounded-xl bg-cyan-900/30 border border-cyan-700/50 text-center shadow-lg">
                        <p className="text-base font-semibold text-cyan-200 uppercase">Tổng số tiền cần thanh toán</p>
                        <p className="text-4xl font-extrabold text-yellow-300 mt-2">
                            {currentDataset.price_vnd
                                ? `${currentDataset.price_vnd.toLocaleString("vi-VN")} VNĐ`
                                : `${currentDataset.price_eth} ETH`}
                        </p>
                    </div>

                    {/* 🏦 Thông tin Chuyển khoản và QR Code (chia 2 cột) */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Cột 1: Thông tin chuyển khoản */}
                        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 space-y-3 text-gray-200 shadow-md">
                            <h2 className="text-xl font-bold text-cyan-400 border-b border-gray-700/50 pb-2 mb-3">Thông tin ngân hàng</h2>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <strong className="text-white">Ngân hàng:</strong> {currentDataset.seller?.bank_name}
                                </p>
                                <p>
                                    <strong className="text-white">Chủ tài khoản:</strong> {currentDataset.seller?.bank_user_name}
                                </p>
                                <p className="text-lg font-extrabold text-white bg-gray-700 p-2 rounded-lg mt-3">
                                    Số tài khoản: {currentDataset.seller?.bank_account}
                                </p>
                            </div>
                        </div>

                        {/* Cột 2: QR Code và Thông tin Dataset */}
                        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 space-y-4 text-gray-300 shadow-md flex flex-col items-center">
                            <h2 className="text-xl font-bold text-cyan-400 border-b border-gray-700/50 pb-2 w-full text-center">QR Code</h2>
                            {/* Giả lập QR Code */}
                            <div className="w-40 h-40 bg-gray-700 flex items-center justify-center rounded-lg border-2 border-white/50 text-white text-xs">
                                [Vị trí QR Code]
                            </div>
                            <p className="text-sm italic text-gray-400 pt-2 text-center">Quét mã để chuyển khoản nhanh chóng.</p>
                        </div>
                    </div>

                    {/* 📝 Tóm tắt Sản phẩm */}
                    <div className="pt-4 border-t border-gray-700/50">
                        <h2 className="text-xl font-bold text-white mb-4">Sản phẩm đã chọn</h2>
                        <div className="flex gap-4 items-center bg-gray-900/30 p-4 rounded-lg">
                            <img
                                src={imageUrl}
                                alt={currentDataset.title}
                                className="rounded-md object-cover w-16 h-12 shadow-md"
                            />
                            <div className="flex-1 text-gray-300">
                                <p className="font-semibold text-white">{currentDataset.title}</p>
                                <p className="text-xs">ID: {currentDataset.dataset_id}</p>
                            </div>
                            <span className="font-bold text-lg text-green-400">
                                {currentDataset.price_vnd?.toLocaleString("vi-VN")} đ
                            </span>
                        </div>
                    </div>

                    {/* Nút Xác nhận */}
                    <div className="pt-6">
                        <Button
                            onClick={() => {
                                alert("Xác nhận thanh toán thành công! (sẽ làm API sau)");
                                router.push("/orders");
                            }}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.01] shadow-xl hover:shadow-green-500/50"
                        >
                            TÔI ĐÃ CHUYỂN KHOẢN VÀ HOÀN TẤT
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
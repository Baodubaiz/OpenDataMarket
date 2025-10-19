"use client";

import { useParams } from "next/navigation";
import { useDatasetById } from "@/hooks/dataset/useDataset";
import Image from "next/image";
import Background from "@/components/background";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function DatasetDetailPage() {
    const { id } = useParams();
    const { data: dataset, isLoading, error } = useDatasetById(id as string);

    if (isLoading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
    if (error) return <div className="text-center py-10 text-red-400">Lỗi tải dữ liệu</div>;
    if (!dataset) return <div className="text-center py-10">Không tìm thấy dataset</div>;

    // ✅ Lấy ảnh như DatasetCard
    const imageUrl = dataset.thumbnail_url
        ? `http://localhost:3001${dataset.thumbnail_url}`
        : "/placeholder.png";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
            <Background />

            <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
                {/* --- Thông tin dataset --- */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                        {/* Dùng <img> thay vì <Image> để tránh lỗi domain */}
                        <img
                            src={imageUrl}
                            alt={dataset.title}
                            className="w-full h-full object-cover rounded-2xl"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.png";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{dataset.title}</h1>
                        <p className="text-gray-300">{dataset.description}</p>

                        <div className="flex items-center gap-2 text-yellow-400">
                            <Star className="w-5 h-5 fill-yellow-400" />
                            <span>4.8 (23 đánh giá)</span>
                        </div>

                        <div className="space-y-1">
                            <p>💰 Giá: <span className="text-green-400 font-semibold">{dataset.price_vnd.toLocaleString()} VNĐ</span></p>
                            {dataset.price_eth && (
                                <p>⛓️ Giá ETH: <span className="text-purple-400">{dataset.price_eth} ETH</span></p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-blue-600 hover:bg-blue-700">Mua ngay</Button>
                            <Button variant="outline" className="border-gray-600">Xem demo</Button>
                        </div>
                    </div>
                </div>

                {/* --- Thông tin người bán --- */}
                {dataset.seller && (
                    <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700">
                        <h2 className="text-xl font-semibold mb-3">Người bán</h2>
                        <p><span className="font-medium text-gray-200">Tên:</span> {dataset.seller.full_name}</p>
                        <p><span className="font-medium text-gray-200">Email:</span> {dataset.seller.email}</p>
                        <p><span className="font-medium text-gray-200">SĐT:</span> {dataset.seller.phone_number}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

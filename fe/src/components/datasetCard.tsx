import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dataset } from "@/types/index";

interface DatasetCardProps {
    dataset: Dataset;
    onView?: (dataset: Dataset) => void;
    className?: string;
}

export function DatasetCard({ dataset, onView, className }: DatasetCardProps) {
    // Xử lý đường dẫn ảnh để sử dụng biến 'thumbnail' đã khai báo
    const imageUrl = dataset.thumbnail_url
        ? `http://localhost:3001${dataset.thumbnail_url}`
        : "/placeholder.png";

    return (
        <Card
            className={`
                relative overflow-hidden rounded-2xl border border-transparent 
                bg-white/5 backdrop-blur-sm 
                transition-all duration-300 ease-in-out
                shadow-lg shadow-black/30
                
                /* HIỆU ỨNG HOVER CẢI TIẾN: Border Glow & Nâng nhẹ */
                hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/30
                hover:-translate-y-1 
                ${className}
            `}>

            {/* KHU VỰC ẢNH CẢI TIẾN */}
            <div className="relative w-full h-44">
                <img
                    src={imageUrl}
                    alt={dataset.title}
                    // Bỏ opacity để ảnh sắc nét hơn, giữ object-cover
                    className="w-full h-full object-cover rounded-t-2xl"
                />

                {/* LỚP PHỦ GRADIENT: Giúp tiêu đề dễ đọc và ảnh hòa hợp với nền tối */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>

            <CardContent className="p-4">
                <h3 className="font-bold text-xl text-white mb-1 line-clamp-1 tracking-wide">
                    {dataset.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2 min-h-[40px]">
                    {dataset.description || "Không có mô tả chi tiết."}
                </p>

                {/* 💰 Bố cục giá: hiển thị theo điều kiện, căn giữa đồng đều */}
                <div className="mb-4 min-h-[48px] flex flex-col justify-center">
                    {dataset.price_vnd != null && dataset.price_vnd > 0 ? (
                        <>
                            <p className="text-base font-semibold text-purple-300">
                                {dataset.price_vnd.toLocaleString()} VNĐ
                            </p>
                            {dataset.price_eth != null && dataset.price_eth > 0 && (
                                <p className="text-sm font-medium text-purple-400/80 mt-1">
                                    ~ {dataset.price_eth.toLocaleString()} ETH
                                </p>
                            )}
                        </>
                    ) : dataset.price_eth != null && dataset.price_eth > 0 ? (
                        <p className="text-base font-semibold text-purple-300">
                            {dataset.price_eth.toLocaleString()} ETH
                        </p>
                    ) : (
                        <p className="text-base font-semibold text-green-400">
                            Free
                        </p>
                    )}
                </div>

                <Button
                    onClick={() => onView?.(dataset)}
                    className="
                        w-full 
                        /* Gradient tím-xanh đẹp hơn, màu đậm hơn */
                        bg-gradient-to-r from-purple-600 to-green-500 
                        text-white font-bold text-base 
                        shadow-lg shadow-purple-500/40 
                        hover:from-purple-500 hover:to-green-400 
                        transition-all duration-300 ease-in-out 
                        transform hover:scale-[1.01]
                    ">
                    Xem chi tiết
                </Button>
            </CardContent>
        </Card>
    );
}
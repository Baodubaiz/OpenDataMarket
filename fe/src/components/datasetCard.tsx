import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dataset } from "@/types/index";

interface DatasetCardProps {
    dataset: Dataset;
    onView?: (dataset: Dataset) => void;
    className?: string;
}

export function DatasetCard({ dataset, onView, className }: DatasetCardProps) {
    const thumbnail = dataset.thumbnail_url || "/placeholder.png";

    return (
        <Card
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 ${className}`}>
            <img
                src={`http://localhost:3001${dataset.thumbnail_url}`}
                alt={dataset.title}
                className="w-full h-44 object-cover rounded-t-2xl opacity-90"
            />
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-white mb-1 line-clamp-1">
                    {dataset.title}
                </h3>
                <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                    {dataset.description || "Không có mô tả"}
                </p>
                <p className="text-sm font-medium mb-3 text-purple-300">
                    {dataset.price_vnd.toLocaleString()} VNĐ
                </p>
                <p className="text-sm font-medium mb-3 text-purple-300">
                    {dataset.price_eth?.toLocaleString()} VNĐ
                </p>
                <Button
                    onClick={() => onView?.(dataset)}
                    className="w-full bg-gradient-to-r from-purple-500 to-green-400 text-white font-semibold hover:opacity-90 transition">
                    Xem chi tiết
                </Button>
            </CardContent>
        </Card>
    );
}

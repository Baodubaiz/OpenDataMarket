"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
    useDatasets,
    useDatasetBySellerName,
    useUpdateDataset,
    useDeleteDataset,
} from "@/hooks/dataset/useDataset";

// Cần import các components Table và icon tương ứng
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Eye, XCircle, Search } from "lucide-react";
// import CategorySkeleton from "@/components/skeletons/CategorySkeleton"; // Nếu có

export default function AdminDatasetPage() {
    const [sellerName, setSellerName] = useState("");
    const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token") || "";

    const { data: datasets = [], isLoading } = sellerName
        ? useDatasetBySellerName(sellerName)
        : useDatasets();

    const updateDataset = useUpdateDataset(token);
    const deleteDataset = useDeleteDataset(token);

    const handleToggleActive = async (dataset: any) => {
        try {
            await updateDataset.mutateAsync({
                id: dataset.dataset_id,
                data: { is_active: !dataset.is_active },
            });
            toast.success("Đã cập nhật trạng thái dataset!");
        } catch {
            toast.error("Cập nhật thất bại!");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Xác nhận xóa dataset này? Hành động này không thể hoàn tác.")) return;
        try {
            await deleteDataset.mutateAsync(id);
            toast.success("Đã xóa dataset!");
        } catch {
            toast.error("Xóa thất bại!");
        }
    };

    // Tạo hàm giả định cho hành động xem chi tiết
    const handleViewDetails = (id: string) => {
        toast.info(`Đang mở chi tiết dataset ID: ${id}`);
        // Logic chuyển trang/mở modal chi tiết sẽ ở đây
    }

    // Nếu bạn muốn hiển thị skeleton loading, có thể dùng lại component đã có
    // if (isLoading) return <CategorySkeleton />; 
    if (isLoading) return <p className="text-gray-400">Đang tải dữ liệu...</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-sky-400">📂 Quản lý Dataset</h1>

            {/* --- BỘ LỌC VÀ TÌM KIẾM CẢI TIẾN --- */}
            <Card className="bg-gray-800 border-gray-700 shadow-xl p-4">
                <CardContent className="p-0 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">

                    {/* Input Tìm kiếm theo tên Seller */}
                    <div className="relative flex-1 min-w-[250px] max-w-lg">
                        <Input
                            placeholder="Tìm kiếm dataset theo Tên người bán..."
                            value={sellerName}
                            onChange={(e) => setSellerName(e.target.value)}
                            className="w-full bg-gray-700 border-gray-600 text-white pl-10 h-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                    </div>

                    {/* Nút Clear Filter */}
                    {sellerName && (
                        <Button
                            variant="outline"
                            onClick={() => setSellerName("")}
                            className="flex items-center bg-transparent border-red-500 text-red-400 hover:bg-red-900/20 h-10 flex-shrink-0"
                        >
                            <XCircle className="w-4 h-4 mr-2" /> Xóa lọc
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* --- DANH SÁCH DATASET DẠNG BẢNG --- */}
            <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                    {datasets.length > 0 ? (
                        // Sử dụng Bảng (Table)
                        <div className="overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader className="bg-gray-700/50">
                                    <TableRow className="border-gray-700 hover:bg-gray-700/50">
                                        <TableHead className="w-[40px] text-gray-300">#</TableHead>
                                        <TableHead className="min-w-[200px] text-sky-400">Tên Dataset</TableHead>
                                        <TableHead className="min-w-[150px] text-gray-300">Người bán (Email)</TableHead>
                                        <TableHead className="w-[100px] text-right text-gray-300">Giá (VNĐ)</TableHead>
                                        <TableHead className="w-[100px] text-center text-gray-300">Trạng thái</TableHead>
                                        <TableHead className="w-[150px] text-center text-gray-300">Hành động</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {datasets.map((d: any, index: number) => (
                                        <TableRow
                                            key={d.dataset_id}
                                            className="border-gray-700 hover:bg-gray-700/70 transition-colors"
                                        >
                                            <TableCell className="font-medium text-gray-400">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="font-semibold text-white truncate max-w-[200px]">
                                                {d.name}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-400">
                                                {d.owner?.full_name || "N/A"}
                                                <span className="block text-xs text-gray-500">({d.owner?.email})</span>
                                            </TableCell>
                                            <TableCell className="text-right text-green-400 font-mono">
                                                {d.price_vnd?.toLocaleString() || '0'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <Switch
                                                        checked={d.is_active}
                                                        onCheckedChange={() => handleToggleActive(d)}
                                                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
                                                        disabled={updateDataset.isPending}
                                                    />
                                                    <span className={`text-xs ${d.is_active ? 'text-green-400' : 'text-red-400'}`}>
                                                        {d.is_active ? 'Active' : 'Hidden'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="space-x-2 text-center">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleViewDetails(d.dataset_id)}
                                                    className="w-8 h-8 text-sky-400 border-sky-400/50 hover:bg-sky-900/30"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(d.dataset_id)}
                                                    disabled={deleteDataset.isPending}
                                                    className="w-8 h-8"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-gray-400 p-6 text-center">
                            Không tìm thấy dataset nào phù hợp với bộ lọc.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
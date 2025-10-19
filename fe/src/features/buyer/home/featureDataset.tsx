"use client";

import { useState } from "react";
import { Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DatasetCard } from "@/components/datasetCard";
import { Dataset, Category } from "@/types/index";
import { useActiveDatasets } from "@/hooks/dataset/useDataset"; // hook lấy datasets
import { useCategories } from "@/hooks/category/useCategory"; // hook lấy categories

// Hook filter dataset theo category
const useDatasetsWithFilter = (categoryId: string | null) => {
    const { data: allDatasets = [], isLoading } = useActiveDatasets(); // hook gốc không tham số
    const filteredDatasets = categoryId
        ? allDatasets.filter(ds => ds.category.category_id === categoryId)
        : allDatasets;
    return { data: filteredDatasets, isLoading };
};

export function FeaturedDatasets() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Lấy danh sách category
    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    // Lấy dataset nổi bật (lọc category tại FE)
    const { data: datasets = [], isLoading: datasetsLoading } = useDatasetsWithFilter(selectedCategory);

    const handleViewDataset = (dataset: Dataset) => {
        window.location.href = `/dataset/${dataset.dataset_id}`;
    };

    return (
        <section id="datasets" className="py-20 bg-gradient-to-b from-transparent to-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-bold text-4xl sm:text-5xl mb-6">
                        Dataset{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                            Nổi bật
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Khám phá các bộ dữ liệu được đánh giá cao nhất từ cộng đồng
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categoriesLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-28 rounded-full" />
                        ))
                    ) : (
                        <>
                            {/* Tất cả */}
                            <Button
                                variant={!selectedCategory ? "default" : "outline"}
                                onClick={() => setSelectedCategory(null)}
                                className={`glass transition-all duration-300 font-semibold rounded-full px-6 py-2 bg-black ${!selectedCategory
                                    ? "bg-gradient-to-r from-purple-500 to-green-400 text-white shadow-lg"
                                    : "border-white/30 hover:text-white hover:bg-purple-500/20 hover:scale-105 cursor-pointer"
                                    }`}
                            >
                                🔥 Tất cả
                            </Button>

                            {categories.map((cat: Category) => (
                                <Button
                                    key={cat.category_id}
                                    variant={selectedCategory === cat.category_id ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(cat.category_id)}
                                    className={`glass transition-all duration-300 font-semibold rounded-full px-6 py-2 bg-black ${selectedCategory === cat.category_id
                                        ? "bg-gradient-to-r from-purple-500 to-green-400 text-white shadow-lg scale-105"
                                        : "border-white/30 hover:text-white hover:bg-purple-500/20 hover:scale-105 cursor-pointer"
                                        }`}
                                >
                                    {cat.name}
                                </Button>
                            ))}
                        </>
                    )}
                </div>

                {/* Datasets Grid */}
                {datasetsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="glass rounded-2xl overflow-hidden">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-6">
                                    <Skeleton className="h-6 w-3/4 mb-3" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3 mb-4" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {datasets.map((dataset: Dataset) => (
                            <DatasetCard
                                key={dataset.dataset_id}
                                dataset={dataset}
                                onView={handleViewDataset}
                                className="glass w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-105"
                            />
                        ))}
                    </div>
                )}

                {/* View All */}
                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        size="lg"
                        className="glass border-white/20 hover:text-white hover:bg-purple-500/20 hover:scale-110 transition-all duration-300 bg-black/20 text-white"
                        onClick={() => (window.location.href = "/marketplace")}
                    >
                        <Grid3X3 className="mr-2 h-5 w-5" />
                        Xem tất cả dataset
                    </Button>
                </div>
            </div>
        </section>
    );
}

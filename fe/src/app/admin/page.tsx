"use client";

import Image from "next/image";
import Background from "@/components/background";
import AdminSidebar from "@/features/admin/sideBar.admin";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";
import { useState } from "react";
import CategoryManager from "@/features/admin/category.admin";
import UserManager from "@/features/admin/user.admin"; // ✅ import UserManager
import AdminDatasetPage from "@/features/admin/dataset.admin";

export default function Home() {
    useAuthGuard();
    const [tab, setTab] = useState("dashboard");

    // Đặt độ rộng cho Sidebar để dễ quản lý, ví dụ: w-64
    const SIDEBAR_WIDTH_CLASS = "w-64";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-x-hidden">
            <div className="relative z-0">
                <Background />
                <div className="flex">

                    {/* 👇 ĐÃ SỬA: Thêm fixed, h-full, và w-64 (độ rộng cố định) */}
                    <div className={`fixed top-0 left-0 h-screen ${SIDEBAR_WIDTH_CLASS} z-10`}>
                        <AdminSidebar currentTab={tab} onSelectTab={setTab} />
                    </div>

                    {/* 👇 ĐÃ SỬA: Thêm ml-64 (margin trái) để nội dung không bị sidebar che mất */}
                    <main className={`flex-1 p-6 text-white hidden-scrollbar ml-64`}>
                        {tab === "dashboard" && <div>📊 Trang tổng quan</div>}
                        {tab === "users" && <UserManager />}
                        {tab === "datasets" && <AdminDatasetPage />}
                        {tab === "categories" && <CategoryManager />}
                        {tab === "settings" && <div>⚙️ Cài đặt hệ thống</div>}
                    </main>
                </div>
            </div>
        </div>
    );
}
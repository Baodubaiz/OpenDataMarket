"use client";

import { Link } from "wouter";
import {
    User,
    BarChart3,
    Users,
    Package,
    TrendingUp,
    Settings,
} from "lucide-react";
import { useParams } from "next/navigation";

export function Sidebar() {
    const params = useParams(); // 👈 lấy id từ URL
    const sellerId = params?.id as string; // /seller/[id]

    const menuItems = [
        { path: `/seller/${sellerId}`, label: "Dashboard", icon: BarChart3 },
        { path: `/seller/${sellerId}/users`, label: "Người dùng", icon: Users },
        { path: `/seller/${sellerId}/products`, label: "Sản phẩm", icon: Package },
        { path: `/seller/${sellerId}/analytics`, label: "Phân tích", icon: TrendingUp },
        { path: `/seller/${sellerId}/settings`, label: "Cài đặt", icon: Settings },
    ];

    return (
        <aside className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
            {/* header */}
            <div className="p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="text-white w-4 h-4" />
                    </div>
                    <span className="text-xl font-semibold text-white">Seller Panel</span>
                </div>
            </div>

            {/* nav */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.path} href={item.path}>
                            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800">
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer (Seller info) */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">Seller User</p>
                        <p className="text-xs text-gray-400">seller@example.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
export default Sidebar;
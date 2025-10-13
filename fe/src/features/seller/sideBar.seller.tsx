"use client";

import Link from "next/link";
import {
    User,
    BarChart3,
    Users,
    Package,
    TrendingUp,
    Settings,
    LogOut,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Sidebar() {
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const sellerId = params?.id as string;

    const [open, setOpen] = useState(false);

    // 🧩 Giải mã token để hiện thông tin người dùng
    let userInfo = { name: "Seller User", email: "seller@example.com" };
    try {
        const token = Cookies.get("accessToken") || localStorage.getItem("accessToken") || "";
        if (token) {
            const decoded: any = jwtDecode(token);
            if (decoded?.name || decoded?.email) {
                userInfo = {
                    name: decoded.name || "Seller",
                    email: decoded.email || "",
                };
            }
        }
    } catch { }

    const handleLogout = () => {
        Cookies.remove("accessToken");
        localStorage.removeItem("accessToken");
        router.replace("/login");
    };

    const menuItems = [
        { path: `/seller/${sellerId}`, label: "Dashboard", icon: BarChart3 },
        { path: `/seller/${sellerId}/users`, label: "Người dùng", icon: Users },
        { path: `/seller/${sellerId}/products`, label: "Sản phẩm", icon: Package },
        { path: `/seller/${sellerId}/analytics`, label: "Phân tích", icon: TrendingUp },
        { path: `/seller/${sellerId}/settings`, label: "Cài đặt", icon: Settings },
    ];

    return (
        <aside className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col relative">
            {/* Header */}
            <div className="p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="text-white w-4 h-4" />
                    </div>
                    <span className="text-xl font-semibold text-white">Seller Panel</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}>
                            <div
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer ${isActive
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div
                className="p-4 border-t border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors relative"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">{userInfo.name}</p>
                        <p className="text-xs text-gray-400">{userInfo.email}</p>
                    </div>
                </div>

                {open && (
                    <div className="absolute bottom-16 left-4 right-4 bg-gray-900 border border-gray-700 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2 z-50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg"
                        >
                            <LogOut className="w-4 h-4 mr-2 text-gray-400" />
                            Đăng xuất
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}

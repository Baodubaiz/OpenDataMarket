"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function useAuthGuard() {
    const router = useRouter();

    useEffect(() => {
        // 🧠 Lấy token từ cookie (BE gửi về)
        let token = Cookies.get("accessToken");

        // Nếu cookie không có, fallback sang localStorage
        if (!token) token = localStorage.getItem("accessToken") || "";

        // ❌ Không có token → chuyển login
        if (!token) {
            router.replace("/login");
            alert("Bạn đéo có trình vào đây !!!");
            return;
        }

        try {
            const decoded: any = jwtDecode(token);

            // ⏰ Token hết hạn → xóa và chuyển login
            if (decoded.exp * 1000 < Date.now()) {
                Cookies.remove("accessToken");
                localStorage.removeItem("accessToken");
                router.replace("/login");
                return;
            }
        } catch {
            // ❌ Token lỗi → redirect
            Cookies.remove("accessToken");
            localStorage.removeItem("accessToken");
            router.replace("/login");
        }
    }, [router]);
}

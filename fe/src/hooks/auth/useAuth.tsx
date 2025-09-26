import { useMutation } from '@tanstack/react-query';
import { login, logout, register } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // dùng sonner thay cho toast cũ
import { User } from 'lucide-react';

export const useAuth = () => {
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            toast.success("Đăng nhập thành công");
            console.log("Login data:", data.user?.role);
            if (data.user?.role === "buyer") {
                router.push("/");
                // quay lại trang hiện tại (không redirect)
                // tức là chỉ toast mà giữ nguyên router
            } else if (data.user?.role === "seller") {
                router.push("/seller");
            } else if (data.user?.role === "admin") {
                router.push("/admin");
            }
        },
        onError: () => {
            toast.error("Đăng nhập thất bại");
        },
    });

    // const loginMutation = useMutation({
    //     mutationFn: login, onSuccess: () => {
    //         toast.success('Đăng nhập thành công');
    //         router.push('/');
    //     },
    //     onError: () => {
    //         toast.error('Đăng nhập thất bại');

    //     },
    // });

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success('Đăng ký thành công');
            router.push('/login');
        },
        onError: () => {
            toast.error('Đăng ký thất bại');
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('Đăng xuất thành công');
            router.push('/login');
        },
        onError: () => {
            toast.error('Đăng xuất thất bại');
        },
    });

    return {
        login: loginMutation.mutate,
        loginLoading: loginMutation.status === 'pending',
        register: registerMutation.mutate,
        registerLoading: registerMutation.status === 'success',
        logout: logoutMutation.mutate,
        logoutLoading: logoutMutation.status === 'error',
    };
};

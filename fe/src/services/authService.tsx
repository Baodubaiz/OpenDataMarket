// src/services/auth.ts

import api from '@/lib/axios';
import { LoginInput, RegisterInput, LoginResponse, RegisterResponse } from '@/types/index';
import { decodeToken } from '@/lib/decodeToken';


// Login function
export const login = async (data: LoginInput): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>('/login', data);
    const token = res.data.token;

    if (token) {
        localStorage.setItem('accessToken', token); // lưu token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // gắn sẵn header
        // const decodedToken = decodeToken(token);s
    }
    // console.log("Token from BE:", res.data.token, "Type:", typeof res.data.token);
    // console.log('Login response:', res.data);
    return res.data;
};

// Register function
export const register = async (data: RegisterInput): Promise<RegisterResponse> => {
    const res = await api.post<RegisterResponse>('/register', data);
    return res.data;
};

// Logout function
export const logout = () => {
    localStorage.removeItem('accessToken');
    delete api.defaults.headers.common['Authorization'];
    return Promise.resolve();
};

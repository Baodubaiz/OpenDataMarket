import { jwtDecode } from "jwt-decode";


export interface UserPayload {
    user_id: string;
    role: string;
    wallet_address?: string;
    iat?: number;
    exp?: number;
}

// Hàm decode accessToken
export const decodeToken = (token: string): UserPayload | null => {
    try {
        const decoded = jwtDecode<UserPayload>(token);
        // console.log("Decoded inside decodeToken:", decoded);
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

import apiClient from "./apiClient";

export const userService = {

    async getById(id) {
        const res = await apiClient.get(`/api/v1/users/get-by-id/${id}`);
        return res.data; // ResponseData<UserDto>
    },

    async updateUser(payload) {
        // payload: { id, tenDangNhap, hoTen, email, soDienThoai }
        const res = await apiClient.put("/api/v1/users/update", payload);
        return res.data; // ResponseData<UserDto>
    },

    async register(payload) {
        // payload: { username, password }
        const res = await apiClient.post("/api/v1/auth/signup", payload, { skipAuth: true });
        return res.data; // ResponseObject
    },

    async login(payload) {
        // payload: { username, password }
        const res = await apiClient.post("/api/v1/auth/login", payload, { skipAuth: true });
        const data = res?.data?.data; // JwtResponse
        if (data?.token) {
            localStorage.setItem("access_token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);
            localStorage.setItem("userId", data.id);
        }
        return res.data; // ResponseObject
    },

    async verifyAccount(payload) {
        // dùng cho KÍCH HOẠT TÀI KHOẢN (register)
        const res = await apiClient.post("/api/v1/users/active-account", payload, { skipAuth: true });
        return res.data;
    },

    async resendOTP(email) {
        const res = await apiClient.post("/api/v1/users/resend-otp", { email }, { skipAuth: true });
        return res.data;
    },

    async sendForgotPasswordOTP(usernameOrEmail) {
        // Cập nhật endpoint thành /api/v1/auth/forgot-password theo Backend
        const res = await apiClient.post(
            "/api/v1/auth/forgot-password",
            { email: usernameOrEmail }, // Đổi thành email theo như AuthController 
            { skipAuth: true }
        );
        return res.data;
    },

    async resetPassword({ token, newPassword }) {
        // Cập nhật endpoint thành /api/v1/auth/reset-password theo Backend
        const res = await apiClient.post(
            "/api/v1/auth/reset-password",
            { token, newPassword }, // Cập nhật tham số theo ResetPasswordRequest của Backend
            { skipAuth: true }
        );
        return res.data;
    },

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
    },

    getToken() {
        return localStorage.getItem("access_token");
    },

    async changePassword(payload) {
        const res = await apiClient.post("/api/v1/users/change-password", payload);
        return res.data;
    },

};

import apiClient from "./apiClient";

export const nguoiDungService = {

    async getById(id) {
        const res = await apiClient.get(`/api/v1/nguoi-dung/get-by-id/${id}`);
        return res.data; // ResponseData<NguoiDungDto>
    },

    async updateUser(payload) {
        // payload: { id, tenDangNhap, hoTen, email, soDienThoai }
        const res = await apiClient.put("/api/v1/nguoi-dung/update", payload);
        return res.data; // ResponseData<NguoiDungDto>
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
        const res = await apiClient.post("/api/v1/nguoi-dung/active-account", payload, { skipAuth: true });
        return res.data;
    },

    async resendOTP(email) {
        const res = await apiClient.post("/api/v1/nguoi-dung/resend-otp", { email }, { skipAuth: true });
        return res.data;
    },

    async sendForgotPasswordOTP(usernameOrEmail) {
        // BE expects: { username }
        const res = await apiClient.post(
            "/api/v1/nguoi-dung/forgot-password",
            { username: usernameOrEmail },
            { skipAuth: true }
        );
        return res.data;
    },

    async resetPassword({ username, otp, password }) {
        // BE expects: { username, otp, password }
        const res = await apiClient.post(
            "/api/v1/nguoi-dung/reset-password",
            { username, otp, password },
            { skipAuth: true }
        );
        return res.data;
    },

    logout() {
        localStorage.removeItem("access_token");
    },

    getToken() {
        return localStorage.getItem("access_token");
    },

    async changePassword(payload) {
        const res = await apiClient.post("/api/v1/nguoi-dung/change-password", payload);
        return res.data;
    },


};
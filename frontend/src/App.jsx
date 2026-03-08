// ============================================================
// src/App.jsx
// Routing đơn giản không cần react-router:
//   / hoặc /dashboard  → DashboardLayout
//   /reset-password    → ResetPassword page
// ============================================================

import "./assets/global.css";
import "./assets/button.css";
import { AuthProvider } from "./context/AuthContext";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ResetPassword } from "./components/ResetPassword";

const isResetPage = () =>
    window.location.pathname.startsWith("/reset-password");

export default function App() {
    return (
        <AuthProvider>
            {isResetPage() ? <ResetPassword /> : <DashboardLayout />}
        </AuthProvider>
    );
}

import "./assets/global.css";
import "./assets/button.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { SalesLayout }     from "./layouts/Saleslayout";
import { ResetPassword }   from "./components/Resetpassword";
import { LoginModal }      from "./components/LoginModal";

const isResetPage = () => window.location.pathname.startsWith("/reset-password");

const AppContent = () => {
    const { user } = useAuth();

    if (isResetPage()) return <ResetPassword />;
    if (!user)         return <LoginModal onClose={() => {}} />;

    // Route theo role
    if (user.role === "ROLE_SALES_STAFF") return <SalesLayout />;

    // Mặc định: production dashboard
    return <DashboardLayout />;
};

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
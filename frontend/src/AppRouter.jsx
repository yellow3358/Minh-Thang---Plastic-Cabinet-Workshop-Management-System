import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UserDetail from "./pages/UserDetail";
import DashboardLayout from "./components/layout/DashboardLayout";
import SalesDashboard from "./pages/dashboards/SalesDashboard";
import SalesManagerDashboard from "./pages/dashboards/SalesManagerDashboard";
import ProductionDashboard from "./pages/dashboards/ProductionDashboard";
import WarehouseDashboard from "./pages/dashboards/WarehouseDashboard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<UserDetail />} />

        {/* Dashboard Routes nested in DashboardLayout */}
        <Route path="/dashboards" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboards/sales" replace />} />
          <Route path="sales" element={<SalesDashboard />} />
          <Route path="sales-manager" element={<SalesManagerDashboard />} />
          <Route path="production" element={<ProductionDashboard />} />
          <Route path="warehouse" element={<WarehouseDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UserDetail from "./pages/UserDetail";
import DashboardLayout from "./components/layout/DashboardLayout";
import SalesDashboard from "./pages/dashboards/SalesDashboard";
import SalesTeams from "./pages/dashboards/SalesTeams";
import SalesManagerDashboard from "./pages/dashboards/SalesManagerDashboard";
import ProductionDashboard from "./pages/dashboards/ProductionDashboard";
import WarehouseDashboard from "./pages/dashboards/WarehouseDashboard";
import Products from "./pages/dashboards/Products";
import Users from "./pages/dashboards/Users";
import WarehouseReceipts from "./pages/dashboards/WarehouseReceipts";
import WarehouseDeliveryOrders from "./pages/dashboards/WarehouseDeliveryOrders";
import AppLegacy from "./App"; // Giao diện từ bạn của user

export default function AppRouter() {
  return (
    <Router>
      <Toaster position="top-center" richColors closeButton duration={3500} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Inventory Legacy (Code từ bạn) */}
        <Route path="/inventory-legacy" element={<AppLegacy />} />

        {/* Dashboard Routes nested in DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<UserDetail />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/dashboards">
            <Route index element={<Navigate to="/dashboards/sales" replace />} />
            <Route path="sales" element={<SalesDashboard />} />
            <Route path="sales-teams" element={<SalesTeams />} />
            <Route path="sales-manager" element={<SalesManagerDashboard />} />
            <Route path="production" element={<ProductionDashboard />} />
            <Route path="warehouse" element={<WarehouseDashboard />} />
            <Route path="inventory">
              <Route path="products" element={<Products />} />
            </Route>
            <Route path="settings">
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="warehouse/receipts" element={<WarehouseReceipts />} />
            <Route path="warehouse/delivery-orders" element={<WarehouseDeliveryOrders />} />
          </Route>
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-xl font-bold font-sans">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

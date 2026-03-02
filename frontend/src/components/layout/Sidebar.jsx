import React from "react";
import {
    LayoutDashboard,
    BarChart3,
    Factory,
    Warehouse,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    Menu
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
    { title: "Kinh doanh", icon: BarChart3, path: "/dashboards/sales", color: "text-blue-500" },
    { title: "Quản lý kinh doanh", icon: LayoutDashboard, path: "/dashboards/sales-manager", color: "text-indigo-500" },
    { title: "Sản xuất", icon: Factory, path: "/dashboards/production", color: "text-emerald-500" },
    { title: "Kho bãi", icon: Warehouse, path: "/dashboards/warehouse", color: "text-orange-500" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
    const location = useLocation();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-xl">M</span>
                        </div>
                        <span className="font-black text-slate-800 text-lg tracking-tighter">MINH THANG</span>
                    </div>
                )}
                {collapsed && (
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-white font-black">M</span>
                    </div>
                )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-blue-50 text-blue-600 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? item.color : "group-hover:text-slate-900")} />
                            {!collapsed && <span className="font-bold text-sm tracking-tight">{item.title}</span>}
                            {isActive && !collapsed && (
                                <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 space-y-2">
                <Link to="/profile" className="flex items-center gap-3 px-3 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all">
                    <User className="h-5 w-5 text-slate-400" />
                    {!collapsed && <span className="font-bold text-sm tracking-tight">Hồ sơ cá nhân</span>}
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all">
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span className="font-bold text-sm tracking-tight">Đăng xuất</span>}
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-4 top-10 h-8 w-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
            >
                {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
        </aside>
    );
}

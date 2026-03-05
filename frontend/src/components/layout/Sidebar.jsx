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
    Menu,
    Package,
    Users
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuGroups = [
    {
        label: "THỐNG KÊ & BÁO CÁO",
        items: [
            { title: "Kinh doanh", icon: BarChart3, path: "/dashboards/sales", color: "text-blue-500" },
            { title: "Quản lý kinh doanh", icon: LayoutDashboard, path: "/dashboards/sales-manager", color: "text-indigo-500" },
            { title: "Sản xuất", icon: Factory, path: "/dashboards/production", color: "text-emerald-500" },
            { title: "Kho bãi", icon: Warehouse, path: "/dashboards/warehouse", color: "text-orange-500" },
        ]
    },
    {
        label: "QUẢN LÝ KHO & SẢN PHẨM",
        items: [
            { title: "Sản phẩm", icon: Package, path: "/dashboards/inventory/products", color: "text-blue-600" },
        ]
    },
    {
        label: "CẤU HÌNH HỆ THỐNG",
        items: [
            { title: "Quản lý người dùng", icon: Users, path: "/dashboards/settings/users", color: "text-blue-600" },
        ]
    }
];

export default function Sidebar({ collapsed, setCollapsed }) {
    const location = useLocation();

    return (
        <aside
            className={cn(
                "sticky top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col shrink-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-white font-black text-xl italic">M</span>
                </div>
                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="font-black text-slate-800 text-lg leading-none tracking-tight">Thắng Minh</span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider mt-1 uppercase">PCWMS Dashboards</span>
                    </div>
                )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto scrollbar-none">
                {menuGroups.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                        {!collapsed && (
                            <div className="px-3 pb-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{group.label}</span>
                            </div>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive =
                                    location.pathname === item.path ||
                                    location.pathname.startsWith(`${item.path}/`);
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
                                        <item.icon className={cn("h-5 w-5", isActive ? item.color : "group-hover:text-slate-900 transition-colors")} />
                                        {!collapsed && <span className="font-bold text-sm tracking-tight">{item.title}</span>}
                                        {isActive && !collapsed && (
                                            <div className="absolute right-0 h-8 w-1 rounded-l-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>


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

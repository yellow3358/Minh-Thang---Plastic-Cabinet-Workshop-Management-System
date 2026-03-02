import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"} p-8`}>
                <header className="mb-10 flex items-center justify-between">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                            placeholder="Tìm kiếm báo cáo, đơn hàng..."
                            className="pl-12 h-12 rounded-2xl border-none bg-white shadow-sm focus-visible:ring-blue-500 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative h-12 w-12 flex items-center justify-center bg-white rounded-2xl shadow-sm text-slate-400 hover:text-blue-600 transition-all hover:shadow-md">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-3 right-3 h-2 w-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                        </button>

                        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 tracking-tight">Minh Thắng</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quản trị viên</p>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white border-2 border-white ring-2 ring-slate-100 ring-offset-2 ring-offset-slate-50 overflow-hidden">
                                <User className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

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
            <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"} flex flex-col min-h-screen`}>
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                            placeholder="Tìm kiếm báo cáo, đơn hàng..."
                            className="pl-12 h-11 rounded-full border-none bg-slate-100/50 shadow-none focus-visible:ring-blue-500 transition-all placeholder:text-slate-400 placeholder:font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative h-11 w-11 flex items-center justify-center bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 transition-all hover:shadow-sm">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>

                        <div className="flex items-center gap-4 pl-6 border-l border-slate-200 h-10">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 tracking-tight leading-none">Admin Minh Thắng</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">MASTER ADMIN</p>
                            </div>
                            <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white border-2 border-white ring-2 ring-slate-100 overflow-hidden relative group/avatar">
                                <User className="h-6 w-6" />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

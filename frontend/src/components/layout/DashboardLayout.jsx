import React, { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
    Bell,
    Search,
    User,
    Plus,
    Filter,
    LayoutGrid,
    List as ListIcon,
    BarChart2,
    Calendar,
    ChevronRight,
    MessageSquare,
    Settings,
    History,
    X,
    LogOut,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [searchTags, setSearchTags] = useState([]);
    const [activeView, setActiveView] = useState("kanban");

    const userMenuRef = useRef(null);
    const searchRef = useRef(null);
    const location = useLocation();

    // Close menus when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTag = (tagName) => {
        if (searchTags.includes(tagName)) {
            setSearchTags(searchTags.filter(t => t !== tagName));
        } else {
            setSearchTags([...searchTags, tagName]);
        }
    };

    const removeTag = (tagName) => {
        setSearchTags(searchTags.filter(t => t !== tagName));
    };

    const getPageTitle = (path) => {
        if (path.includes("sales-manager")) return "Quản lý kinh doanh";
        if (path.includes("sales-teams")) return "Kinh doanh";
        if (path.includes("sales")) return "Kinh doanh";
        if (path.includes("production")) return "Sản xuất";
        if (path.includes("warehouse")) return "Kho bãi";
        if (path.includes("profile")) return "Hồ sơ cá nhân";
        return "Tổng quan";
    };

    const pageTitle = getPageTitle(location.pathname);

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main Content */}
            <main className="flex-1 transition-all duration-300 flex flex-col min-w-0 overflow-y-auto">
                <header className="sticky top-0 z-40 bg-white flex flex-col w-full border-b border-slate-200 shadow-sm">
                    {/* Tầng 1: Breadcrumbs & Utilities */}
                    <div className="h-10 border-b border-slate-100 flex items-center">
                        <div className="w-full flex items-center justify-between px-6">
                            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 uppercase tracking-wider shrink-0">
                                <span className="hover:text-blue-600 cursor-pointer transition-colors">Dashboards</span>
                                <ChevronRight className="h-3 w-3 text-slate-300" />
                                {location.pathname.includes("sales") ? (
                                    <div className="flex items-center gap-2">
                                        <Link 
                                            to="/dashboards/sales" 
                                            className={`transition-colors hover:text-blue-600 ${location.pathname === "/dashboards/sales" ? "text-slate-900 font-black" : ""}`}
                                        >
                                            Kinh doanh
                                        </Link>
                                        <ChevronRight className="h-3 w-3 text-slate-300" />
                                        <Link 
                                            to="/dashboards/sales-teams" 
                                            className={`transition-colors hover:text-blue-600 ${location.pathname === "/dashboards/sales-teams" ? "text-slate-900 font-black" : ""}`}
                                        >
                                            Sale Team
                                        </Link>
                                    </div>
                                ) : (
                                    <span className="text-slate-900 font-black">{pageTitle}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="text-slate-400 hover:text-blue-600 transition-all p-1 hover:bg-slate-50 rounded-md">
                                    <MessageSquare className="h-4 w-4" />
                                </button>
                                <button className="text-slate-400 hover:text-blue-600 transition-all p-1 hover:bg-slate-50 rounded-md relative">
                                    <Bell className="h-4 w-4" />
                                    <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-rose-500 rounded-full border border-white" />
                                </button>

                                {/* User Menu Dropdown */}
                                <div className="relative ml-2" ref={userMenuRef}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-3 pl-4 border-l border-slate-100 py-1 hover:bg-slate-50 px-2 rounded-lg transition-all group"
                                    >
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] font-bold text-slate-900 leading-tight">Admin Minh Thắng</p>
                                            <p className="text-[8px] font-medium text-blue-600 tracking-tighter uppercase">MASTER ADMIN</p>
                                        </div>
                                        <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-black group-hover:scale-105 transition-transform shadow-sm">
                                            MT
                                        </div>
                                        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right z-50 overflow-hidden">
                                            <div className="px-3 py-2 border-b border-slate-50 mb-1">
                                                <p className="text-xs font-bold text-slate-900">Admin Minh Thắng</p>
                                                <p className="text-[10px] text-slate-400">admin@pcwms.com</p>
                                            </div>

                                            <div className="px-1 space-y-0.5">
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
                                                >
                                                    <User className="h-4 w-4" />
                                                    Hồ sơ cá nhân
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
                                                >
                                                    <Settings className="h-4 w-4" />
                                                    Cấu hình
                                                </Link>
                                                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                                                    <div className="w-4 h-4 flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    </div>
                                                    Trạng thái Online
                                                    <ChevronRight className="h-3 w-3 ml-auto text-slate-300" />
                                                </div>
                                            </div>

                                            <div className="my-2 border-t border-slate-50" />

                                            <div className="px-1">
                                                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-rose-500 hover:bg-rose-50 transition-all group font-medium text-left">
                                                    <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tầng 2: Actions & Search - Chỉ hiển thị cho trang Sales Dashboard chính. Các trang khác (như Sales Teams) có header riêng. */}
                    {location.pathname === "/dashboards/sales" && (
                        <div className="h-14 bg-white/80 backdrop-blur-md flex items-center">
                        <div className="w-full flex items-center justify-between px-6">
                            <div className="flex items-center gap-2 shrink-0">
                                {location.pathname.includes("sales") && !location.pathname.includes("manager") && !location.pathname.includes("teams") ? (
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-sales-quick-create'))}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded px-4 h-8 transition-all"
                                        >
                                            New
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-generate-leads'))}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded px-4 h-8"
                                        >
                                            Generate Leads
                                        </Button>
                                        <div className="flex items-center gap-1 ml-2 text-slate-600 font-medium text-sm cursor-pointer hover:text-blue-600 transition-colors">
                                            Pipeline <Settings className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl px-5 gap-2 h-9 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                                    >
                                        <Plus className="h-4 w-4" />
                                        MỚI
                                    </Button>
                                )}
                            </div>

                            <div className="flex-1 max-w-2xl px-4 relative" ref={searchRef}>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 max-w-[70%] overflow-hidden">
                                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors shrink-0" />
                                        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                                            {searchTags.map(tag => (
                                                <div key={tag} className="h-6 flex items-center bg-blue-50 text-[10px] px-2 rounded-lg text-blue-600 border border-blue-100 font-black uppercase tracking-tight whitespace-nowrap animate-in zoom-in duration-200">
                                                    {tag}
                                                    <X
                                                        className="h-3 w-3 ml-1.5 cursor-pointer hover:text-rose-500"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeTag(tag);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Input
                                        placeholder={searchTags.length === 0 ? "Tìm kiếm báo cáo, dữ liệu..." : ""}
                                        onFocus={() => setSearchDropdownOpen(true)}
                                        style={{ paddingLeft: searchTags.length > 0 ? `${(searchTags.length * 80) + 36}px` : "2.5rem" }}
                                        className="h-10 w-full bg-slate-100/50 border-none rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-blue-500/20 transition-all placeholder:text-slate-400"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                        <Filter
                                            className={`h-4 w-4 cursor-pointer transition-colors ${searchDropdownOpen ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
                                            onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
                                        />
                                        <Settings className="h-4 w-4 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
                                    </div>
                                </div>

                                {/* Search Dropdown / Filters Menu */}
                                {searchDropdownOpen && (
                                    <div className="absolute top-full left-12 right-12 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300 grid grid-cols-3 gap-8">
                                        {/* Filters Column */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-slate-900">
                                                <Filter className="h-4 w-4 text-blue-600" />
                                                <span className="font-black text-sm uppercase tracking-wider">Bộ lọc</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {["Minh Thắng", "Đang hoạt động", "Cần xử lý", "Hoàn thành"].map(item => (
                                                    <li
                                                        key={item}
                                                        onClick={() => toggleTag(item)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer flex items-center justify-between ${searchTags.includes(item) ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                                                    >
                                                        {item}
                                                        {searchTags.includes(item) && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Group By Column */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-slate-900">
                                                <LayoutGrid className="h-4 w-4 text-indigo-600" />
                                                <span className="font-black text-sm uppercase tracking-wider">Gồm nhóm</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {["Nhân viên", "Trạng thái", "Ngày tạo", "Khu vực"].map(item => (
                                                    <li
                                                        key={item}
                                                        className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Favorites Column */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-slate-900">
                                                <History className="h-4 w-4 text-amber-600" />
                                                <span className="font-black text-sm uppercase tracking-wider">Yêu thích</span>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center gap-2">
                                                <p className="text-[11px] text-slate-400 font-medium italic">Lưu bộ lọc hiện tại để sử dụng sau này</p>
                                                <Button size="sm" variant="outline" className="h-8 text-[11px] font-black border-slate-200">LƯU TÌM KIẾM</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-100">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setActiveView("kanban")}
                                                className={`h-8 w-8 rounded-lg transition-all ${activeView === "kanban" ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-blue-600 hover:bg-white"}`}
                                            >
                                                <LayoutGrid className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-slate-900 text-white border-none text-[10px] font-bold px-2 py-1">
                                            Kanban
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setActiveView("list")}
                                                className={`h-8 w-8 rounded-lg transition-all ${activeView === "list" ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-blue-600 hover:bg-white"}`}
                                            >
                                                <ListIcon className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-slate-900 text-white border-none text-[10px] font-bold px-2 py-1">
                                            Danh sách
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setActiveView("calendar")}
                                                className={`h-8 w-8 rounded-lg transition-all ${activeView === "calendar" ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-blue-600 hover:bg-white"}`}
                                            >
                                                <Calendar className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-slate-900 text-white border-none text-[10px] font-bold px-2 py-1">
                                            Lịch biểu
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        </div>
                    )}
                </header>

                <div className="flex-1 w-full flex flex-col min-h-0">
                    <Outlet context={{ activeView }} />
                </div>
            </main>
        </div>
    );
}

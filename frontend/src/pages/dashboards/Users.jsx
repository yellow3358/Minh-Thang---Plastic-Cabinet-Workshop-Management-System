import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
    User,
    Mail,
    ShieldCheck,
    Briefcase,
    Clock,
    MoreVertical,
    Star,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserForm from "./UserForm";

export default function Users() {
    const context = useOutletContext();
    const activeView = context?.activeView || "kanban";
    const [isCreating, setIsCreating] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Initial fake data
    const initialUsers = [
        {
            id: 1,
            name: "Admin Minh Thắng",
            username: "minhthang",
            email: "admin@pcwms.com",
            phone: "0901234567",
            role: "Master Admin",
            roleId: "quan_tri_vien",
            team: "Management",
            lastLogin: "Just now",
            status: "Online",
            avatar: "MT"
        },
        {
            id: 2,
            name: "Nguyễn Văn A",
            username: "vana",
            email: "vana@pcwms.com",
            phone: "0912345678",
            role: "Sales Manager",
            roleId: "nhan_vien_ban_hang",
            team: "North Team",
            lastLogin: "2 hours ago",
            status: "Away",
            avatar: "VA"
        },
        {
            id: 3,
            name: "Trần Thị B",
            username: "thib",
            email: "thib@pcwms.com",
            phone: "0923456789",
            role: "Production Staff",
            roleId: "nhan_vien_kho",
            team: "Factory A",
            lastLogin: "Yesterday",
            status: "Offline",
            avatar: "TB"
        }
    ];

    const [users, setUsers] = useState(initialUsers);

    useEffect(() => {
        const handleOpenCreate = () => {
            setEditingUser(null);
            setIsCreating(true);
        };
        window.addEventListener('open-user-create', handleOpenCreate);
        return () => window.removeEventListener('open-user-create', handleOpenCreate);
    }, []);

    const handleSaveUser = (userData) => {
        if (editingUser) {
            // Update
            setUsers(users.map(u =>
                u.id === editingUser.id
                    ? {
                        ...u,
                        name: userData.hoTen,
                        email: userData.email,
                        phone: userData.soDienThoai,
                        username: userData.tenDangNhap,
                        roleId: userData.vaiTro,
                        role: userData.vaiTro === "quan_tri_vien" ? "Quản trị viên"
                            : userData.vaiTro === "quan_ly_kho" ? "Quản lý kho"
                                : userData.vaiTro === "nhan_vien_kho" ? "Nhân viên kho"
                                    : userData.vaiTro === "nhan_vien_ban_hang" ? "NV Bán hàng"
                                        : "NV Mua hàng"
                    }
                    : u
            ));
        } else {
            // Create
            const nameParts = userData.hoTen?.trim().split(/\s+/) || ["U"];
            const avatar = nameParts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "U";

            const newUser = {
                id: Date.now(),
                name: userData.hoTen || "Người dùng mới",
                username: userData.tenDangNhap,
                email: userData.email,
                phone: userData.soDienThoai,
                roleId: userData.vaiTro,
                role: userData.vaiTro === "quan_tri_vien" ? "Quản trị viên"
                    : userData.vaiTro === "quan_ly_kho" ? "Quản lý kho"
                        : userData.vaiTro === "nhan_vien_kho" ? "Nhân viên kho"
                            : userData.vaiTro === "nhan_vien_ban_hang" ? "NV Bán hàng"
                                : "NV Mua hàng",
                team: "Phòng ban mới",
                lastLogin: "Chưa từng đăng nhập",
                status: "Offline",
                avatar: avatar
            };
            setUsers([newUser, ...users]);
        }
        setIsCreating(false);
        setEditingUser(null);
    };

    const handleDeleteUser = () => {
        if (editingUser) {
            setUsers(users.filter(u => u.id !== editingUser.id));
            setIsCreating(false);
            setEditingUser(null);
        }
    };

    if (isCreating || editingUser) {
        return (
            <UserForm
                user={editingUser}
                onBack={() => {
                    setIsCreating(false);
                    setEditingUser(null);
                }}
                onSave={handleSaveUser}
                onDelete={handleDeleteUser}
            />
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#f8f9fa] animate-in fade-in duration-500">
            <div className="flex-1 overflow-auto p-6">
                {activeView === "kanban" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => setEditingUser(user)}
                                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all group cursor-pointer relative"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-12 w-12 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm transition-transform group-hover:scale-105",
                                            user.id === 1 ? "bg-blue-600" : "bg-slate-400"
                                        )}>
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{user.name}</h3>
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mt-1">{user.role}</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-300 hover:text-slate-600 p-1">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                        <Mail className="h-3 w-3 text-slate-400" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                        <Briefcase className="h-3 w-3 text-slate-400" />
                                        {user.team}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            user.status === "Online" ? "bg-emerald-500" :
                                                user.status === "Away" ? "bg-amber-500" : "bg-slate-300"
                                        )} />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{user.status}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium italic">
                                        <Clock className="h-3 w-3" />
                                        {user.lastLogin}
                                    </div>
                                </div>

                                {/* Hover actions */}
                                <div className="absolute top-4 right-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <Star className="h-4 w-4 text-slate-200 hover:text-yellow-400 transition-colors" />
                                </div>
                            </div>
                        ))}

                        {/* Empty/Create card */}
                        <div
                            onClick={() => setIsCreating(true)}
                            className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer group"
                        >
                            <div className="h-10 w-10 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-sm tracking-tight">Thêm người dùng mới</span>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider w-10">
                                        <div className="w-4 h-4 rounded border border-slate-300" />
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Người dùng</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Vai trò</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Phòng ban/Nhóm</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Đăng nhập cuối</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => setEditingUser(user)}
                                        className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-4 h-4 rounded border border-slate-300" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "h-8 w-8 rounded-lg flex items-center justify-center text-white font-black text-[10px] shadow-sm",
                                                    user.id === 1 ? "bg-blue-600" : "bg-slate-400"
                                                )}>
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{user.name}</p>
                                                    <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-tighter">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600">{user.team}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    user.status === "Online" ? "bg-emerald-500" :
                                                        user.status === "Away" ? "bg-amber-500" : "bg-slate-300"
                                                )} />
                                                <span className="text-sm font-medium text-slate-500">{user.lastLogin}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-300 hover:text-slate-600 p-1">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-4 bg-slate-50/50 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng cộng: {users.length} người dùng</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8 text-[11px] font-black border-slate-200">TRƯỚC</Button>
                                <Button variant="outline" size="sm" className="h-8 text-[11px] font-black border-slate-200">SAU</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

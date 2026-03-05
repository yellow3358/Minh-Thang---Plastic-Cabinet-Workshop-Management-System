import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Save,
    X,
    User,
    Mail,
    Phone,
    Shield,
    Calendar,
    Clock,
    ArrowLeft,
    CheckCircle2,
    Lock,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserForm({ onBack, user, onSave, onDelete }) {
    const [formData, setFormData] = useState({
        hoTen: user?.name || "",
        tenDangNhap: user?.username || "",
        email: user?.email || "",
        soDienThoai: user?.phone || "",
        vaiTro: user?.roleId || "nhan_vien_kho",
        password: ""
    });

    const vaiTroOptions = [
        { value: "quan_tri_vien", label: "Quản trị viên" },
        { value: "quan_ly_kho", label: "Quản lý kho" },
        { value: "nhan_vien_kho", label: "Nhân viên kho" },
        { value: "nhan_vien_ban_hang", label: "Nhân viên bán hàng" },
        { value: "nhan_vien_mua_hang", label: "Nhân viên mua hàng" },
    ];

    const getVaiTroLabel = (value) => vaiTroOptions.find((opt) => opt.value === value)?.label || "—";

    const initials = useMemo(() => {
        const name = formData.hoTen?.trim();
        if (!name) return "New";
        const parts = name.split(/\s+/).slice(0, 2);
        return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
    }, [formData.hoTen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 animate-in fade-in duration-500 overflow-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack} className="h-9 w-9 rounded-lg border-slate-200">
                        <ArrowLeft className="w-4 h-4 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {user ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
                        </h1>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Hệ thống quản lý nhân sự</p>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    {user && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
                                    onDelete();
                                }
                            }}
                            className="h-9 w-9 p-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-transparent rounded-lg mr-2 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                    <Button variant="outline" onClick={onBack} className="h-9 font-bold text-slate-600 border-slate-200 hover:bg-slate-100 px-6 rounded-lg">
                        <X className="w-4 h-4 mr-2" />
                        Hủy bỏ
                    </Button>
                    <Button
                        className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                        onClick={() => onSave(formData)}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {user ? "Lưu thay đổi" : "Lưu người dùng"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Summary Card */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
                        <CardContent className="p-6 pt-0 -mt-12">
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-xl">
                                    <AvatarFallback className="bg-blue-600 text-white text-2xl font-black">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                <h3 className="text-xl font-bold text-slate-900">
                                    {formData.hoTen || "Họ và tên..."}
                                </h3>

                                <p className="text-blue-600 font-bold text-sm mb-4 tracking-tight">
                                    {formData.tenDangNhap ? `@${formData.tenDangNhap}` : "@username"}
                                </p>

                                <Badge className="mb-6 bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                    <Shield className="w-3 h-3 mr-1.5" />
                                    {getVaiTroLabel(formData.vaiTro)}
                                </Badge>

                                <div className="w-full space-y-3 text-left border-t border-slate-100 pt-6">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">Trạng thái</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-emerald-600 font-black">MỚI</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">Ngày tạo</span>
                                        <span className="text-slate-700 font-bold">Hôm nay</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3 border-b border-slate-50">
                            <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                Thông tin hệ thống
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-400">ID Dự kiến</span>
                                <span className="text-slate-900">{user ? `#${user.id}` : "#NEW"}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-400">Mã cơ sở</span>
                                <span className="text-slate-900">MT-P-026</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right - Form Tabs */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="info" className="space-y-4">
                        <TabsList className="bg-slate-100 p-1 rounded-xl h-11">
                            <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold text-sm px-8">
                                Thông tin tài khoản
                            </TabsTrigger>
                            <TabsTrigger value="access" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold text-sm px-8">
                                Quyền truy cập
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="info" className="mt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-slate-800">Thông tin cá nhân</CardTitle>
                                    <CardDescription>Vui lòng nhập đầy đủ thông tin cơ bản cho thành viên mới.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="hoTen" className="text-xs font-black text-slate-600 uppercase tracking-tighter">Họ và tên</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="hoTen"
                                                    placeholder="e.g. Nguyễn Văn A"
                                                    className="pl-10 h-11 border-slate-200 focus:ring-blue-500/20 focus:border-blue-600 rounded-lg"
                                                    value={formData.hoTen}
                                                    onChange={(e) => handleInputChange("hoTen", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tenDangNhap" className="text-xs font-black text-slate-600 uppercase tracking-tighter">Tên đăng nhập</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">@</span>
                                                <Input
                                                    id="tenDangNhap"
                                                    placeholder="username"
                                                    className="pl-8 h-11 border-slate-200 focus:ring-blue-500/20 focus:border-blue-600 rounded-lg"
                                                    value={formData.tenDangNhap}
                                                    onChange={(e) => handleInputChange("tenDangNhap", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-black text-slate-600 uppercase tracking-tighter">Địa chỉ Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="example@pcwms.com"
                                                    className="pl-10 h-11 border-slate-200 focus:ring-blue-500/20 focus:border-blue-600 rounded-lg"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="soDienThoai" className="text-xs font-black text-slate-600 uppercase tracking-tighter">Số điện thoại</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="soDienThoai"
                                                    placeholder="09xx xxx xxx"
                                                    className="pl-10 h-11 border-slate-200 focus:ring-blue-500/20 focus:border-blue-600 rounded-lg"
                                                    value={formData.soDienThoai}
                                                    onChange={(e) => handleInputChange("soDienThoai", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-xs font-black text-slate-600 uppercase tracking-tighter">Mật khẩu khởi tạo</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10 h-11 border-slate-200 focus:ring-blue-500/20 focus:border-blue-600 rounded-lg"
                                                value={formData.password}
                                                onChange={(e) => handleInputChange("password", e.target.value)}
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-medium">Người dùng sẽ được yêu cầu đổi mật khẩu trong lần đăng nhập đầu tiên.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="access" className="mt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-slate-800">Quyền hạn & Vai trò</CardTitle>
                                    <CardDescription>Cấp quyền truy cập dựa trên trách nhiệm công việc.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black text-slate-600 uppercase tracking-tighter">Chọn vai trò chính</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {vaiTroOptions.map((role) => (
                                                <div
                                                    key={role.value}
                                                    onClick={() => handleInputChange("vaiTro", role.value)}
                                                    className={cn(
                                                        "flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all",
                                                        formData.vaiTro === role.value
                                                            ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                                                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                                                        formData.vaiTro === role.value ? "bg-blue-600 border-blue-600" : "border-slate-300"
                                                    )}>
                                                        {formData.vaiTro === role.value && <div className="h-2 w-2 rounded-full bg-white shadow-sm" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 leading-none">{role.label}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 italic text-[11px] text-slate-400">
                                        * Các quyền hạn cụ thể cho từng vai trò có thể được tùy chỉnh sâu hơn trong phần Cài đặt nâng cao.
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

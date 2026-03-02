import React from "react";
import {
    Package,
    ArrowDownToLine,
    ArrowUpFromLine,
    Box,
    Truck,
    History,
    AlertCircle,
    TrendingDown,
    ChevronRight,
    Plus
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const warehouseStats = [
    { title: "Tổng giá trị tồn", value: "3.8B", color: "bg-indigo-600", icon: Box },
    { title: "Sản phẩm trong kho", value: "1,250", color: "bg-blue-600", icon: Package },
    { title: "Nhập kho (Tháng)", value: "42", color: "bg-emerald-600", icon: ArrowDownToLine },
    { title: "Xuất kho (Tháng)", value: "38", color: "bg-orange-600", icon: ArrowUpFromLine },
];

const lowStockItems = [
    { item: "Tấm nhựa PVC vân gỗ", inStock: 45, unit: "tấm", minStock: 100, status: "Rất thấp" },
    { item: "Keo 502 chuyên dụng", inStock: 12, unit: "thùng", minStock: 20, status: "Dưới mức" },
    { item: "Thanh nhôm bo góc", inStock: 80, unit: "m", minStock: 150, status: "Sắp hết" },
];

const recentTransactions = [
    { type: "Nhập", code: "IM-001", item: "Nhựa PE nguyên sinh", qty: "2,000kg", date: "Hôm nay", vendor: "Nhựa Tiền Phong" },
    { type: "Xuất", code: "EX-042", item: "Tủ nhựa 4 ngăn", qty: "10 bộ", date: "2 giờ trước", vendor: "Kho Đại Lý" },
    { type: "Nhập", code: "IM-002", item: "Bản lề cánh tủ", qty: "500 bộ", date: "Hôm qua", vendor: "Phụ kiện Kim Khí" },
];

export default function WarehouseDashboard() {
    return (
        <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight tracking-[-0.04em]">Quản Lý Kho Bãi</h2>
                    <p className="text-slate-500 font-medium">Theo dõi biến động vật tư và thành phẩm tại xưởng Minh Thắng.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 px-6 font-bold shadow-sm hover:bg-slate-50 gap-2"><History className="h-4 w-4" /> Lịch sử</Button>
                    <Button className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all gap-2"><Plus className="h-4 w-4" /> Nhập Kho Mới</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {warehouseStats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white border border-transparent hover:border-indigo-100 transition-all group">
                        <div className={cn("h-1.5 w-full", stat.color)}></div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</CardTitle>
                            <div className={cn("p-2 rounded-2xl", stat.color.replace('bg-', 'bg-') + "/10")}>
                                <stat.icon className={cn("h-5 w-5", stat.color.replace('bg-', 'text-'))} />
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                            <p className="text-[10px] mt-2 font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tight">Cập nhật lúc 13:30h</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inventory Warning */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden flex flex-col">
                    <CardHeader className="p-8 border-b border-slate-50 bg-rose-50/30">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-100 rounded-xl"><AlertCircle className="h-5 w-5 text-rose-600" /></div>
                            <div>
                                <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Nguyên liệu sắp hết</CardTitle>
                                <CardDescription className="text-rose-500/80 font-bold text-[10px] uppercase tracking-wider">Cần nhập kho ngay lập tức</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                            {lowStockItems.map((item, i) => (
                                <div key={i} className="p-6 hover:bg-slate-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-bold text-slate-800 text-sm group-hover:text-rose-600 transition-colors">{item.item}</p>
                                        <Badge className={cn(
                                            "rounded-lg px-2 py-0.5 font-black text-[9px] uppercase tracking-widest border-none shadow-none",
                                            item.status === "Rất thấp" ? "bg-rose-600 text-white" : "bg-amber-100 text-amber-600"
                                        )}>{item.status}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex gap-4">
                                            <p className="text-slate-400 font-bold">Tồn: <span className="text-slate-900">{item.inStock} {item.unit}</span></p>
                                            <p className="text-slate-400 font-bold">Tối thiểu: <span className="text-slate-900">{item.minStock} {item.unit}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <div className="p-6 bg-slate-50/50">
                        <Button variant="ghost" className="w-full text-indigo-600 font-black text-sm hover:bg-white hover:shadow-sm rounded-2xl py-6 gap-2">
                            Tạo phiếu đề nghị nhập <Truck className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>

                {/* Transactions list */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black text-slate-900 tracking-tight tracking-[-0.03em]">Biến động kho gần đây</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Danh sách các phiếu nhập - xuất kho mới nhất.</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-slate-50"><TrendingDown className="h-5 w-5" /></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Loại</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mã phiếu</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên vật tư</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Số lượng</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentTransactions.map((tx, i) => (
                                        <tr key={i} className="hover:bg-indigo-50/30 transition-colors group cursor-default">
                                            <td className="px-8 py-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-tighter shadow-sm",
                                                    tx.type === "Nhập" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                                                )}>
                                                    {tx.type}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-black text-slate-900">{tx.code}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-700">{tx.item}</p>
                                                <p className="text-[10px] font-bold text-slate-400 italic">{tx.vendor}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">{tx.qty}</td>
                                            <td className="px-8 py-4 text-center">
                                                <Badge variant="outline" className="text-slate-400 font-bold text-[10px] rounded-lg border-slate-100 group-hover:bg-white">{tx.date}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-8 border-t border-slate-50 flex justify-center">
                            <Button variant="link" className="text-indigo-600 font-black text-sm gap-2 group/btn">
                                Tất cả giao dịch kho <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

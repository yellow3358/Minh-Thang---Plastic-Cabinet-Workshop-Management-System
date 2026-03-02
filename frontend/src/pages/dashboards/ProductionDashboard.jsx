import React from "react";
import {
    Factory,
    Settings,
    AlertTriangle,
    Clock,
    CheckCircle2,
    Layers,
    Wrench,
    ChevronRight,
    ClipboardList,
    ArrowUpRight
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const productionStats = [
    { title: "MO Đang chạy", value: "18", icon: Factory, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Sản phẩm hôm nay", value: "45", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Máy móc bảo trì", value: "2", icon: Wrench, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Cảnh báo BOM", value: "5", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
];

const jobs = [
    { id: "MO-2401", product: "Tủ Nhựa MT-04", progress: 65, status: "Lắp ráp", priority: "Cao" },
    { id: "MO-2402", product: "Tủ Nhựa MT-02", progress: 90, status: "Kiểm định", priority: "Trung bình" },
    { id: "MO-2403", product: "Tủ Nhựa MT-Prime", progress: 30, status: "Cắt nhựa", priority: "Gấp" },
    { id: "MO-2404", product: "Kệ Nhựa 3 Tầng", progress: 15, status: "Chuẩn bị", priority: "Thấp" },
];

export default function ProductionDashboard() {
    return (
        <div className="space-y-8 animate-in slide-in-from-top-10 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight tracking-[-0.04em]">Điều Phối Sản Xuất</h2>
                    <p className="text-slate-500 font-medium">Giám sát tiến độ lệnh sản xuất và tình trạng xưởng.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 px-6 font-bold shadow-sm hover:bg-slate-50 gap-2"><ClipboardList className="h-4 w-4" /> Kế hoạch tuần</Button>
                    <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all gap-2">Lệnh sản xuất mới</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productionStats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white border border-transparent hover:border-emerald-100 transition-all group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</CardTitle>
                            <div className={cn("p-2 rounded-2xl", stat.bg)}>
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                            <p className="text-[10px] mt-2 font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tight">Kể từ 08:00 sáng</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active MOs */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black text-slate-900 tracking-tight tracking-[-0.03em]">Lệnh sản xuất đang chạy</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Theo dõi thời gian thực tiến độ lắp ráp tại xưởng.</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl text-slate-400"><Clock className="h-5 w-5" /></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mã lệnh</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sản phẩm</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiến độ</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {jobs.map((job, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <Badge className={cn(
                                                    "rounded-lg px-2 py-0.5 font-black text-[10px] uppercase border-none",
                                                    job.priority === "Gấp" ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-600"
                                                )}>
                                                    {job.id}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-6 font-bold text-slate-900">{job.product}</td>
                                            <td className="px-6 py-6 w-48">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase italic">
                                                        <span>{job.progress}%</span>
                                                        <span>100%</span>
                                                    </div>
                                                    <Progress value={job.progress} className="h-2 rounded-full bg-slate-100" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-black text-slate-900">{job.status}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">GĐ: {i + 1}/5</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Material Alerts */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="h-20 w-20 rounded-3xl bg-amber-50 flex items-center justify-center">
                        <Layers className="h-10 w-10 text-amber-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Vật tư & Định mức</h3>
                        <p className="text-slate-500 text-sm font-medium px-4">Kiểm tra thông tin nguyên liệu và cấu trúc sản phẩm trước khi ra lệnh sản xuất.</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl py-6 font-bold border-slate-200 group/btn">
                        Quản lý BOM <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </Card>
            </div>
        </div>
    );
}

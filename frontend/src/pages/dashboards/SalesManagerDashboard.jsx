import React from "react";
import {
    BarChart,
    Users,
    Wallet,
    PieChart,
    ArrowUpRight,
    TrendingUp,
    Star,
    Zap,
    ChevronRight,
    MoreHorizontal
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

const overviewStats = [
    { title: "Doanh thu toàn xưởng", value: "2.4B", change: "+18.2%", icon: Wallet, color: "bg-blue-600" },
    { title: "Số lượng khách hàng", value: "482", change: "+5.4%", icon: Users, color: "bg-indigo-600" },
    { title: "Đơn hàng tháng này", value: "156", change: "+12.1%", icon: BarChart, color: "bg-violet-600" },
    { title: "Hiệu suất xưởng", value: "94%", change: "+2.5%", icon: Zap, color: "bg-emerald-600" },
];

const topSales = [
    { name: "Nguyễn Văn An", sales: "450M", deals: 32, rating: 4.8 },
    { name: "Lê Thị Bảo", sales: "380M", deals: 28, rating: 4.9 },
    { name: "Phạm Minh Đức", sales: "310M", deals: 24, rating: 4.7 },
    { name: "Trần Thế Vinh", sales: "290M", deals: 21, rating: 4.6 },
];

export default function SalesManagerDashboard() {
    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quản Lý Kinh Doanh</h2>
                    <p className="text-slate-500 font-medium">Báo cáo hiệu suất tổng thể của đội ngũ kinh doanh.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 px-6 font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 bg-white">Xuất báo cáo PDF</Button>
                    <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold px-6 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Thiết lập mục tiêu</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-xl transition-all border border-transparent hover:border-blue-100 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                            <div className={cn("p-2.5 rounded-2xl shadow-inner", stat.color)}>
                                <stat.icon className="h-5 w-5 text-white" />
                            </div>
                            <Badge variant="outline" className="border-slate-100 text-slate-400 font-bold text-[10px] tracking-widest uppercase py-0.5">Tháng 3</Badge>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-emerald-500 font-black text-xs flex items-center bg-emerald-50 px-2 py-0.5 rounded-lg">
                                    <ArrowUpRight className="h-3 w-3 mr-0.5" /> {stat.change}
                                </span>
                                <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider italic">Tăng trưởng</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Chart Placeholder */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden flex flex-col min-h-[400px]">
                    <CardHeader className="p-8 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Xu hướng doanh thu</CardTitle>
                                <CardDescription className="text-slate-500 font-medium">Phân tích biến động doanh thu 6 tháng gần nhất.</CardDescription>
                            </div>
                            <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
                                <Button variant="ghost" size="sm" className="bg-white text-blue-600 font-bold h-8 rounded-lg shadow-sm">Tháng</Button>
                                <Button variant="ghost" size="sm" className="text-slate-500 font-bold h-8 rounded-lg">Quý</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 flex-1 flex flex-col justify-end">
                        <div className="flex items-end justify-between h-48 gap-4 px-4">
                            {[40, 65, 45, 90, 75, 85].map((height, i) => (
                                <div key={i} className="flex-1 space-y-3 flex flex-col items-center group/bar">
                                    <div
                                        className="w-full bg-slate-100 rounded-2xl relative overflow-hidden flex items-end"
                                        style={{ height: '100%' }}
                                    >
                                        <div
                                            className={cn(
                                                "w-full rounded-2xl transition-all duration-1000 ease-out shadow-lg",
                                                i === 3 ? "bg-gradient-to-t from-blue-600 to-indigo-500 h-[90%] shadow-blue-500/30" : "bg-slate-200 group-hover/bar:bg-blue-400"
                                            )}
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tháng {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Employees */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden h-full flex flex-col">
                    <CardHeader className="p-8 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Ngôi sao kinh doanh</CardTitle>
                                <CardDescription className="text-slate-500 font-medium">Bảng xếp hạng hiệu suất nhân viên.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-slate-50 active:scale-90"><MoreHorizontal className="h-5 w-5" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <div className="space-y-4">
                            {topSales.map((person, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50/80 transition-all border border-transparent hover:border-slate-100 group">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                                                {person.name.charAt(0)}
                                            </div>
                                            {i === 0 && <div className="absolute -top-2 -right-2 bg-amber-400 p-1 rounded-full border-2 border-white shadow-lg"><Star className="h-3 w-3 text-white fill-white" /></div>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{person.name}</p>
                                            <div className="flex gap-3 mt-0.5">
                                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{person.deals} đơn hàng</p>
                                                <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 italic">⭐ {person.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 transition-all group-hover:text-lg">{person.sales}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Doanh số</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-6 bg-slate-50 text-slate-500 hover:bg-blue-600 hover:text-white font-black rounded-2xl py-6 border-none transition-all shadow-none hover:shadow-lg active:scale-95 group/btn">
                            Xem báo cáo chi tiết <ChevronRight className="h-5 w-5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

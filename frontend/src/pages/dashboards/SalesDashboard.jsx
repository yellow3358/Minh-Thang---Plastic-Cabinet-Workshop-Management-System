import React from "react";
import {
    TrendingUp,
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Search,
    ChevronRight
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
    {
        title: "Doanh số cá nhân",
        value: "450.0M",
        change: "+12.5%",
        icon: TrendingUp,
        trend: "up",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Khách hàng mới",
        value: "24",
        change: "+18%",
        icon: Users,
        trend: "up",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        title: "Đơn hàng hoàn tất",
        value: "128",
        change: "-2%",
        icon: CreditCard,
        trend: "down",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "Tỷ lệ chốt đơn",
        value: "68%",
        change: "+4.3%",
        icon: Activity,
        trend: "up",
        color: "text-amber-600",
        bg: "bg-amber-50"
    }
];

const recentOrders = [
    { id: "MT-001", client: "Nguyễn Văn A", amount: "12.5M", status: "Hoàn tất", date: "2 giờ trước" },
    { id: "MT-002", client: "Trần Thị B", amount: "8.2M", status: "Đang xử lý", date: "5 giờ trước" },
    { id: "MT-003", client: "Lê Văn C", amount: "25.0M", status: "Đang giao", date: "Hôm qua" },
    { id: "MT-004", client: "Phạm Minh D", amount: "5.5M", status: "Hoàn tất", date: "Hôm qua" },
];

export default function SalesDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight tracking-[-0.04em]">Tổng Quan Kinh Doanh</h2>
                    <p className="text-slate-500 font-medium mt-1">Chào mừng trở lại, đây là báo cáo hiệu suất của bạn hôm nay.</p>
                </div>
                <div className="flex gap-3">
                    <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold px-6 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                        Tạo đơn hàng mới
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                {stat.title}
                            </CardTitle>
                            <div className={cn("p-2.5 rounded-2xl", stat.bg)}>
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">
                                {stat.value}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={cn(
                                    "flex items-center gap-0.5 text-[11px] font-black px-2 py-0.5 rounded-lg",
                                    stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {stat.change}
                                </span>
                                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider italic">So với tháng trước</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart Simulation */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden flex flex-col min-h-[420px]">
                    <CardHeader className="p-8 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Hiệu suất tăng trưởng</CardTitle>
                                <CardDescription className="font-medium text-slate-500">Biểu đồ doanh số theo từng tuần trong tháng.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-xl border-slate-200 font-bold">Tháng này</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 flex-1 flex flex-col justify-end">
                        <div className="flex items-end justify-between h-48 gap-4 px-4">
                            {[60, 45, 80, 55, 90, 70, 85].map((height, i) => (
                                <div key={i} className="flex-1 space-y-3 flex flex-col items-center group/bar">
                                    <div
                                        className="w-full bg-slate-50 rounded-2xl relative overflow-hidden flex items-end"
                                        style={{ height: '100%' }}
                                    >
                                        <div
                                            className={cn(
                                                "w-full rounded-2xl transition-all duration-1000 ease-out shadow-lg",
                                                i === 4 ? "bg-blue-600 h-[90%] shadow-blue-500/30" : "bg-slate-200 group-hover/bar:bg-blue-300"
                                            )}
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tuần {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden flex flex-col">
                    <CardHeader className="p-8 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Đơn hàng mới</CardTitle>
                            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400"><MoreVertical className="h-5 w-5" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <div className="space-y-4">
                            {recentOrders.map((order, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {order.id.slice(-2)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{order.client}</p>
                                            <p className="text-[10px] font-bold text-slate-400 italic">{order.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">{order.amount}</p>
                                        <Badge className={cn(
                                            "mt-1 rounded-lg px-2 py-0 text-[8px] font-black uppercase tracking-widest border-none shadow-none",
                                            order.status === "Hoàn tất" ? "bg-emerald-100 text-emerald-600" :
                                                order.status === "Đang xử lý" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                        )}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-6 bg-slate-50 text-slate-500 hover:bg-blue-600 hover:text-white font-black rounded-2xl py-6 border-none transition-all shadow-none hover:shadow-lg active:scale-95 group/btn">
                            Xem tất cả báo cáo <ChevronRight className="h-5 w-5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


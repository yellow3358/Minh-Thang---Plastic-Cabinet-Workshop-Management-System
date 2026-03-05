import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Truck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

const receiptsData = [
  { name: "T2", value: 6 },
  { name: "T3", value: 8 },
  { name: "T4", value: 7 },
  { name: "T5", value: 9 },
  { name: "T6", value: 5 },
  { name: "T7", value: 4 },
];

const deliveryData = [
  { name: "T2", value: 5 },
  { name: "T3", value: 7 },
  { name: "T4", value: 6 },
  { name: "T5", value: 4 },
  { name: "T6", value: 8 },
  { name: "T7", value: 6 },
];

function ChartPanel({ title, data, buttonLabel, onClick, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-black text-slate-700 uppercase tracking-wide">{title}</h3>
        {icon}
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Button className="mt-3 bg-blue-600 hover:bg-blue-700 font-bold" onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}

export default function WarehouseDashboard() {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-700 p-5 bg-slate-50 min-h-full">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Inventory Overview</h2>
        <p className="text-sm text-slate-500">
          Theo doi bieu do bien lai nhan va bien lai giao hang theo ngay.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartPanel
          title="Receipts"
          data={receiptsData}
          buttonLabel="Xem bien lai nhan"
          onClick={() => navigate("/dashboards/warehouse/receipts")}
          icon={<ClipboardList className="h-5 w-5 text-indigo-600" />}
        />

        <ChartPanel
          title="Delivery Orders"
          data={deliveryData}
          buttonLabel="Xem bien lai giao hang"
          onClick={() => navigate("/dashboards/warehouse/delivery-orders")}
          icon={<Truck className="h-5 w-5 text-indigo-600" />}
        />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialReceipts = [
  {
    id: "RCPT-001",
    date: "2026-03-06",
    productName: "Tam nhua PVC 18mm",
    supplier: "NCC Minh Long",
    quantity: 320,
    status: "Completed",
  },
  {
    id: "RCPT-002",
    date: "2026-03-07",
    productName: "Canh tu mica",
    supplier: "NCC Hoang Gia",
    quantity: 180,
    status: "Pending",
  },
];

function printReceipt(receipt) {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Bien lai nhan ${receipt.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #1f2937; }
          h1 { margin-bottom: 6px; }
          .meta { margin-bottom: 18px; color: #6b7280; }
          .box { border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; }
          .row { display: flex; justify-content: space-between; margin: 8px 0; }
          .label { color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>BIEN LAI NHAN HANG</h1>
        <div class="meta">Ma bien lai: ${receipt.id}</div>
        <div class="box">
          <div class="row"><span class="label">Ngay nhan</span><strong>${receipt.date}</strong></div>
          <div class="row"><span class="label">Ten san pham</span><strong>${receipt.productName}</strong></div>
          <div class="row"><span class="label">Nha cung cap</span><strong>${receipt.supplier}</strong></div>
          <div class="row"><span class="label">So luong</span><strong>${receipt.quantity}</strong></div>
          <div class="row"><span class="label">Trang thai</span><strong>${receipt.status}</strong></div>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export default function WarehouseReceipts() {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState(initialReceipts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    supplier: "",
    quantity: "",
    status: "Pending",
  });

  const handleCreateReceipt = () => {
    if (!formData.date || !formData.productName || !formData.supplier || !formData.quantity) return;

    const nextIndex = receipts.length + 1;
    const nextReceipt = {
      id: `RCPT-${String(nextIndex).padStart(3, "0")}`,
      date: formData.date,
      productName: formData.productName,
      supplier: formData.supplier,
      quantity: Number(formData.quantity) || 0,
      status: formData.status,
    };
    setReceipts((prev) => [nextReceipt, ...prev]);
    setFormData({
      date: "",
      productName: "",
      supplier: "",
      quantity: "",
      status: "Pending",
    });
    setIsCreateOpen(false);
    printReceipt(nextReceipt);
  };

  const handleDeleteReceipt = (receiptId) => {
    const shouldDelete = window.confirm("Ban co chac muon xoa bien lai nay khong?");
    if (!shouldDelete) return;
    setReceipts((prev) => prev.filter((item) => item.id !== receiptId));
  };

  return (
    <div className="p-5 bg-slate-50 min-h-full animate-in fade-in duration-500">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-800">Bien lai nhan</h2>
            <p className="text-sm text-slate-500">Danh sach bien lai nhap kho.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/dashboards/warehouse")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lai dashboard
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tao bien lai nhan
            </Button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-500">
                <th className="px-4 py-3">Ma bien lai</th>
                <th className="px-4 py-3">Ngay</th>
                <th className="px-4 py-3">Ten san pham</th>
                <th className="px-4 py-3">Nha cung cap</th>
                <th className="px-4 py-3">So luong</th>
                <th className="px-4 py-3">Trang thai</th>
                <th className="px-4 py-3">In hoa don</th>
                <th className="px-4 py-3">Xoa</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-700">{item.id}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.productName}</td>
                  <td className="px-4 py-3">{item.supplier}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm" onClick={() => printReceipt(item)}>
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() => handleDeleteReceipt(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xoa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tao bien lai nhan</DialogTitle>
            <DialogDescription>Nhap day du thong tin bien lai nhap kho.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Ngay nhan</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>

            <div className="space-y-1">
              <Label>Nha cung cap</Label>
              <Input
                value={formData.supplier}
                onChange={(event) => setFormData((prev) => ({ ...prev, supplier: event.target.value }))}
                placeholder="Nhap nha cung cap"
              />
            </div>

            <div className="space-y-1">
              <Label>Ten san pham</Label>
              <Input
                value={formData.productName}
                onChange={(event) => setFormData((prev) => ({ ...prev, productName: event.target.value }))}
                placeholder="Nhap ten san pham"
              />
            </div>

            <div className="space-y-1">
              <Label>So luong</Label>
              <Input
                type="number"
                min={1}
                value={formData.quantity}
                onChange={(event) => setFormData((prev) => ({ ...prev, quantity: event.target.value }))}
              />
            </div>

            <div className="space-y-1">
              <Label>Trang thai</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReceipt}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

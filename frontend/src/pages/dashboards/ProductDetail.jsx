import React, { useState } from "react";
import {
    Trash2,
    RotateCcw,
    X,
    Star,
    Camera,
    Box,
    Info,
    MoreHorizontal,
    Cloud,
    Settings,
    FileText,
    Search,
    Paperclip,
    UserCircle,
    Package,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductDetail({ onBack, product, onSave, onDelete }) {
    const [activeTab, setActiveTab] = useState("general"); // 'general', 'sales', 'inventory'
    const [productName, setProductName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || "1.00 ₫");
    const [ref, setRef] = useState(product?.ref || "");
    const [category, setCategory] = useState(product?.category || "All");
    const [onHand, setOnHand] = useState(product?.onHand || "0.00");

    const handleSave = () => {
        if (!productName.trim()) return;

        onSave({
            ...product,
            name: productName,
            price: price,
            ref: ref,
            category: category,
            onHand: onHand
        });
    };

    return (
        <div className="flex flex-col h-full bg-white flex-1 min-h-0 overflow-hidden">
            {/* Form Header / Toolbar */}
            <div className="h-12 border-b border-slate-200 bg-white flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-8 px-4 rounded-[4px]"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 font-medium h-8 px-4 hover:bg-slate-100 rounded-[4px]"
                        onClick={onBack}
                    >
                        Discard
                    </Button>
                    <div className="h-6 w-[1px] bg-slate-200 mx-2" />
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Products /</span>
                        <span className="text-slate-800 text-sm font-bold">{product ? product.name : "New"}</span>
                        <Settings className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {product && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                                    onDelete();
                                }
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    <Cloud className="h-4 w-4 text-slate-400" />
                    <RotateCcw className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <X className="h-4 w-4 text-slate-400 cursor-pointer hover:text-rose-500" onClick={onBack} />
                </div>
            </div>


            {/* Main Form Content */}
            <div className="flex-1 overflow-auto bg-slate-50 p-4 lg:p-10 flex flex-col items-center">
                <div className="w-full max-w-5xl bg-white shadow-sm border border-slate-200 rounded-sm p-8 min-h-[600px] flex flex-col relative animate-in fade-in slide-in-from-bottom-2 duration-500">

                    {/* Top Row: Title & Image */}
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex-1 mr-8">
                            <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Product</div>
                            <div className="flex items-center gap-3 group">
                                <Star className="h-6 w-6 text-slate-300 cursor-pointer hover:text-yellow-400 transition-colors" />
                                <input
                                    className="text-4xl font-normal w-full border-b border-transparent hover:border-slate-200 focus:border-blue-600 focus:outline-none transition-all placeholder:text-slate-200 leading-tight py-1"
                                    placeholder="e.g. Cheese Burger"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-6 mt-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <Checkbox id="sales" className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" defaultChecked />
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">Sales</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <Checkbox id="purchase" className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" defaultChecked />
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">Purchase</span>
                                </label>
                            </div>
                        </div>

                        {/* Product Image Placeholder */}
                        <div className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 group transition-all shrink-0">
                            {product?.image ? (
                                <div className="text-4xl">{product.image}</div>
                            ) : (
                                <>
                                    <div className="bg-slate-200 p-3 rounded-full group-hover:scale-110 transition-transform">
                                        <Camera className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <Plus className="h-4 w-4 text-slate-400 absolute bottom-1 right-1" />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Notebook / Tabs */}
                    <div className="flex border-b border-slate-200 mb-6 font-bold text-sm">
                        <button
                            onClick={() => setActiveTab("general")}
                            className={`px-4 py-2 border-b-2 transition-all ${activeTab === "general" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                        >
                            General Information
                        </button>
                        <button
                            onClick={() => setActiveTab("sales")}
                            className={`px-4 py-2 border-b-2 transition-all ${activeTab === "sales" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                        >
                            Sales
                        </button>
                        <button
                            onClick={() => setActiveTab("inventory")}
                            className={`px-4 py-2 border-b-2 transition-all ${activeTab === "inventory" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                        >
                            Inventory
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 py-4 animate-in fade-in duration-300">
                        {activeTab === "general" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                            Product Type <Info className="h-3 w-3 text-slate-300" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center p-0.5">
                                                    <div className="w-full h-full bg-blue-600 rounded-full"></div>
                                                </div>
                                                Goods
                                            </label>
                                            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-slate-600">
                                                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                                                Service
                                            </label>
                                            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-slate-600">
                                                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                                                Combo
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                            Invoicing Policy <Info className="h-3 w-3 text-slate-300" />
                                        </div>
                                        <div className="text-sm text-slate-800">Ordered quantities</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                            Track Inventory <Info className="h-3 w-3 text-slate-300" />
                                        </div>
                                        <Checkbox className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" defaultChecked />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Quantity On Hand</div>
                                        <div className="flex-1">
                                            <input
                                                className="border-b border-slate-200 w-full focus:border-blue-600 outline-none text-sm py-1 font-bold bg-transparent"
                                                value={onHand}
                                                onChange={(e) => setOnHand(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                            Sales Price <Info className="h-3 w-3 text-slate-300" />
                                        </div>
                                        <div className="flex items-center flex-1">
                                            <input
                                                className="w-full border-b border-slate-200 text-sm font-medium py-1 focus:border-blue-600 outline-none bg-transparent"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                            Sales Taxes <Info className="h-3 w-3 text-slate-300" />
                                        </div>
                                        <div className="flex-1 border-b border-slate-200 h-8 text-sm text-slate-400 italic">None</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                            Cost <Info className="h-3 w-3 text-slate-300" />
                                        </div>
                                        <div className="flex items-center flex-1">
                                            <div className="w-full border-b border-slate-200 text-sm font-medium py-1">0.00 ₫</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Category</div>
                                        <div className="flex-1">
                                            <input
                                                className="w-full border-b border-slate-200 py-1 text-sm focus:border-blue-600 outline-none bg-transparent"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Reference</div>
                                        <div className="flex-1">
                                            <input
                                                className="w-full border-b border-slate-200 py-1 text-sm font-bold text-blue-600 focus:border-blue-600 outline-none bg-transparent"
                                                value={ref}
                                                onChange={(e) => setRef(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Barcode</div>
                                        <div className="flex-1 border-b border-slate-200 h-8" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "sales" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in duration-300">
                                <div>
                                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                        Upsell & Cross-Sell
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 pt-1 shrink-0">
                                                Optional Products <Info className="h-3 w-3 text-slate-300" />
                                            </div>
                                            <div className="flex-1 text-sm text-slate-300">Recommend when 'Adding to Cart' or quotation</div>
                                        </div>
                                        <div className="mt-10">
                                            <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                                Quotation Description
                                            </div>
                                            <div className="text-sm text-slate-300 italic">This note is added to sales orders and invoices.</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                        Extra Info
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Tags</div>
                                        <div className="flex-1 border-b border-slate-200 h-8" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "inventory" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in duration-300">
                                <div>
                                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                        Logistics
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                                Responsible <Info className="h-3 w-3 text-slate-300" />
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-100 transition-colors">
                                                <div className="h-5 w-5 rounded bg-orange-700 flex items-center justify-center text-[10px] text-white font-bold">A</div>
                                                <span className="text-sm text-slate-800">Administrator</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Weight</div>
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="flex-1 border-b border-slate-100 text-sm py-1">0.00</div>
                                                <span className="text-sm text-slate-400 font-medium">kg</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 text-sm font-bold text-slate-700 shrink-0">Volume</div>
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="flex-1 border-b border-slate-100 text-sm py-1">0.00</div>
                                                <span className="text-sm text-slate-400 font-medium">m³</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                                                Customer Lead Time <Info className="h-3 w-3 text-slate-300" />
                                            </div>
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="flex-1 border-b border-slate-100 text-sm py-1">0</div>
                                                <span className="text-sm text-slate-400 font-medium">days</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                            Description for Receipts
                                        </div>
                                        <div className="text-sm text-slate-300 italic">This note is added to receipt orders (e.g. where to store the product in the warehouse).</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="h-[210px]" /> {/* Spacer to align with logistics section */}
                                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                        Description for Delivery Orders
                                    </div>
                                    <div className="text-sm text-slate-300 italic">This note is added to delivery orders.</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

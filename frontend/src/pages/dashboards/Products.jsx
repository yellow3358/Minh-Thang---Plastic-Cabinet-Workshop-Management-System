import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Settings,
    Star,
    Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductDetail from "./ProductDetail";

export default function Products() {
    const context = useOutletContext();
    const activeView = context?.activeView || "kanban";
    const [isCreating, setIsCreating] = useState(false);
    const [viewingProduct, setViewingProduct] = useState(null);

    useEffect(() => {
        const handleOpenCreate = () => {
            setViewingProduct(null);
            setIsCreating(true);
        };
        window.addEventListener('open-product-create', handleOpenCreate);
        return () => window.removeEventListener('open-product-create', handleOpenCreate);
    }, []);

    // Dữ liệu sản phẩm mẫu khởi tạo
    const initialState = [
        {
            id: 1,
            name: "Tủ nhựa 5 tầng Duy Tân",
            ref: "TN001",
            price: "1,250,000 ₫",
            onHand: "24.00",
            category: "Tủ nhựa",
            uom: "Units",
            image: "📦"
        },
        {
            id: 2,
            name: "Ghế nhựa cao cấp",
            ref: "GN002",
            price: "85,000 ₫",
            onHand: "150.00",
            category: "Ghế nhựa",
            uom: "Units",
            image: "🪑"
        },
        {
            id: 3,
            name: "Bàn nhựa trẻ em",
            ref: "BN003",
            price: "210,000 ₫",
            onHand: "45.00",
            category: "Bàn nhựa",
            uom: "Units",
            image: "🧸"
        },
        {
            id: 4,
            name: "Kệ chén 3 tầng",
            ref: "KC004",
            price: "320,000 ₫",
            onHand: "12.00",
            category: "Dụng cụ nhà bếp",
            uom: "Units",
            image: "🍽️"
        },
        {
            id: 5,
            name: "Thùng nhựa 50L",
            ref: "TN050",
            price: "180,000 ₫",
            onHand: "85.00",
            category: "Thùng chứa",
            uom: "Units",
            image: "🛢️"
        }
    ];

    const [products, setProducts] = useState(initialState);

    const handleSaveProduct = (productData) => {
        if (productData.id) {
            // Update existing product
            setProducts(products.map(p => p.id === productData.id ? { ...p, ...productData } : p));
        } else {
            // Create new product
            const newProduct = {
                ...productData,
                id: Date.now(), // Simple unique ID for demo
                image: productData.image || "📦",
                onHand: productData.onHand || "0.00"
            };
            setProducts([newProduct, ...products]);
        }
        setIsCreating(false);
        setViewingProduct(null);
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(p => p.id !== productId));
        setViewingProduct(null);
    };

    if (isCreating) {
        return <ProductDetail onBack={() => setIsCreating(false)} onSave={handleSaveProduct} />;
    }

    if (viewingProduct) {
        return (
            <ProductDetail
                product={viewingProduct}
                onBack={() => setViewingProduct(null)}
                onSave={handleSaveProduct}
                onDelete={() => handleDeleteProduct(viewingProduct.id)}
            />
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] flex-1 min-h-0 overflow-hidden animate-in fade-in duration-500">
            <div className="flex-1 overflow-auto p-6">
                {activeView === "kanban" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => setViewingProduct(product)}
                                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all group cursor-pointer relative flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shadow-sm border border-blue-100 group-hover:scale-105 transition-transform">
                                            {product.image}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight truncate">
                                                {product.name}
                                            </h3>
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mt-1">
                                                {product.ref}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-slate-300 hover:text-slate-600 p-1" onClick={(e) => e.stopPropagation()}>
                                        <Star className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-1 mb-4 flex-1">
                                    <div className="text-xs font-bold text-slate-800">
                                        Price: <span className="text-blue-600">{product.price}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-medium">
                                        Category: {product.category}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            parseFloat(product.onHand) > 20 ? "bg-emerald-500" : "bg-amber-500"
                                        )} />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">On Hand: {product.onHand}</span>
                                    </div>
                                    <div className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Package className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider w-10">
                                        <div className="w-4 h-4 rounded border border-slate-300" />
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Tên sản phẩm</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Mã REF</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Giá bán</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Tồn kho</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Đơn vị</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        onClick={() => setViewingProduct(product)}
                                        className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-4 h-4 rounded border border-slate-300" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-sm">
                                                    {product.image}
                                                </div>
                                                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-tighter">
                                                {product.ref}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-sm text-slate-700">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    parseFloat(product.onHand) > 20 ? "bg-emerald-500" : "bg-amber-500"
                                                )} />
                                                <span className="text-sm font-medium text-slate-600">{product.onHand}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium italic">
                                            {product.uom}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

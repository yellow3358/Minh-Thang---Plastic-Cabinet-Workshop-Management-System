import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Plus,
    MoreHorizontal,
    Star,
    Building2,
    User,
    Briefcase,
    Mail,
    Phone,
    CircleDollarSign,
    Trash2,
    Settings,
    Clock,
    ChevronDown,
    Wand2,
    Edit2,
    ArrowRightLeft,
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
    History,
    MessageSquare,
    StickyNote,
    Calendar,
    Search,
    Paperclip,
    ExternalLink,
    Pin,
    Triangle,
    MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { X, Check } from "lucide-react";

export default function SalesDashboard() {
    const [cards, setCards] = useState([]);

    const [columns, setColumns] = useState([
        { title: "New", color: "border-slate-300" },
        { title: "Qualified", color: "border-slate-300" },
        { title: "Proposition", color: "border-slate-300" },
        { title: "Won", color: "border-emerald-500" }
    ]);
    const [activeColumnMenu, setActiveColumnMenu] = useState(null);
    const [activeCardMenu, setActiveCardMenu] = useState(null);
    const [foldedColumns, setFoldedColumns] = useState([]);
    const [isAddingStage, setIsAddingStage] = useState(false);
    const [newStageName, setNewStageName] = useState("");
    const [viewingCard, setViewingCard] = useState(null);
    const [collapsedListGroups, setCollapsedListGroups] = useState([]);
    const [calendarDate, setCalendarDate] = useState(new Date(2026, 2, 4)); // March 4, 2026
    const { activeView } = useOutletContext();

    const [quickCreateColumn, setQuickCreateColumn] = useState(null);
    const [draggingCardId, setDraggingCardId] = useState(null);
    const [dragOverColumn, setDragOverColumn] = useState(null);
    const [showGenerateLeads, setShowGenerateLeads] = useState(false);
    const [generateLeadsData, setGenerateLeadsData] = useState({
        count: 3,
        countries: ["Vietnam"],
        industries: "",
        filterOnSize: false
    });
    const [formData, setFormData] = useState({
        opportunity: "",
        company: "",
        contact: "",
        email: "",
        phone: "",
        value: "0 đ",
        stars: 0
    });

    useEffect(() => {
        const handleOpenForm = () => setQuickCreateColumn("New");
        const handleOpenGenerateLeads = () => setShowGenerateLeads(true);

        window.addEventListener('open-sales-quick-create', handleOpenForm);
        window.addEventListener('open-generate-leads', handleOpenGenerateLeads);

        return () => {
            window.removeEventListener('open-sales-quick-create', handleOpenForm);
            window.removeEventListener('open-generate-leads', handleOpenGenerateLeads);
        };
    }, []);


    const handleAddCard = () => {
        if (!formData.opportunity && !formData.company) return;

        // Tự động định dạng tiền nếu người dùng chỉ nhập số
        const cleanValue = formData.value.replace(/[^0-9]/g, '');
        const formattedValue = cleanValue ? parseInt(cleanValue).toLocaleString() + " đ" : "0 đ";

        const newCard = {
            id: Date.now(),
            opportunity: formData.opportunity || "Cơ hội mới",
            company: formData.company || "Công ty mới",
            value: formattedValue,
            stars: formData.stars,
            status: quickCreateColumn || "New"
        };

        setCards([...cards, newCard]);
        setFormData({
            opportunity: "",
            company: "",
            contact: "",
            email: "",
            phone: "",
            value: "0 đ",
            stars: 0
        });
        setQuickCreateColumn(null);
    };

    const handleDragStart = (e, cardId) => {
        setDraggingCardId(cardId);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(cardId));

        // Tạo hiệu ứng mờ cho thẻ gốc sau khi bắt đầu kéo
        setTimeout(() => {
            setDraggingCardId(cardId);
        }, 0);
    };

    const handleDragEnd = () => {
        setDraggingCardId(null);
        setDragOverColumn(null);
    };

    const handleDragOver = (e, columnTitle) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (dragOverColumn !== columnTitle) {
            setDragOverColumn(columnTitle);
        }
    };

    const handleDrop = (e, columnTitle) => {
        e.preventDefault();
        const cardIdStr = e.dataTransfer.getData("text/plain");
        if (!cardIdStr) return;

        const cardId = isNaN(Number(cardIdStr)) ? cardIdStr : Number(cardIdStr);

        setCards(prevCards =>
            prevCards.map(card =>
                card.id === cardId ? { ...card, status: columnTitle } : card
            )
        );

        setDraggingCardId(null);
        setDragOverColumn(null);
    };

    const calculateColumnTotal = (columnTitle) => {
        const total = cards
            .filter(card => card.status === columnTitle)
            .reduce((sum, card) => {
                const num = parseInt(card.value.replace(/[^0-9]/g, '')) || 0;
                return sum + num;
            }, 0);
        return total.toLocaleString() + " đ";
    };

    const toggleFold = (columnTitle) => {
        setFoldedColumns(prev =>
            prev.includes(columnTitle)
                ? prev.filter(title => title !== columnTitle)
                : [...prev, columnTitle]
        );
        setActiveColumnMenu(null); // Close menu when folding/unfolding
    };

    const handleAddStage = () => {
        if (newStageName.trim() === "") return;
        setColumns(prev => [...prev, { title: newStageName.trim(), color: "border-slate-300" }]);
        setNewStageName("");
        setIsAddingStage(false);
    };

    const deleteColumn = (columnTitle) => {
        setColumns(prev => prev.filter(col => col.title !== columnTitle));
        setCards(prev => prev.filter(card => card.status !== columnTitle)); // Remove cards in deleted column
        setActiveColumnMenu(null);
    };

    const deleteCard = (cardId) => {
        setCards(prev => prev.filter(card => card.id !== cardId));
        setActiveCardMenu(null);
    };

    const toggleListGroup = (stageTitle) => {
        setCollapsedListGroups(prev => 
            prev.includes(stageTitle) 
                ? prev.filter(t => t !== stageTitle)
                : [...prev, stageTitle]
        );
    };

    const calculateStageTotal = (stageTitle) => {
        const total = cards
            .filter(c => c.status === stageTitle)
            .reduce((sum, c) => {
                const val = parseInt(c.value.replace(/[^0-9]/g, '')) || 0;
                return sum + val;
            }, 0);
        return total.toLocaleString() + " đ";
    };

    const grandTotal = cards.reduce((sum, c) => {
        const val = parseInt(c.value.replace(/[^0-9]/g, '')) || 0;
        return sum + val;
    }, 0).toLocaleString() + " đ";

    if (viewingCard) {
        return (
            <div className="flex flex-col h-full bg-[#f8f9fa] flex-1 min-h-0">
                {/* Form Header */}
                <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between sticky top-0 z-10 h-10">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span 
                            className="cursor-pointer hover:text-blue-600 font-medium transition-colors"
                            onClick={() => setViewingCard(null)}
                        >
                            Pipeline
                        </span>
                        <span className="text-slate-400 font-light">/</span>
                        <span className="text-slate-900 font-bold">{viewingCard.opportunity}</span>
                        <Settings className="h-3 w-3 text-slate-400 ml-1 cursor-pointer hover:text-slate-600" />
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium">1 / 1</span>
                            <div className="flex border border-slate-200 rounded-[3px] overflow-hidden">
                                <button className="p-1 hover:bg-slate-50 border-r border-slate-200 transition-colors">
                                    <ChevronLeftIcon className="h-3.5 w-3.5" />
                                </button>
                                <button className="p-1 hover:bg-slate-50 transition-colors">
                                    <ChevronRightIcon className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Action Bar */}
                <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shadow-sm z-[5]">
                    <div className="flex items-center gap-1.5">
                        <Button className="bg-[#71639e] hover:bg-[#63568c] text-white rounded-[4px] h-[30px] px-3 font-bold text-[11px] uppercase tracking-wide transition-all shadow-sm">New Quotation</Button>
                        <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-[4px] h-[30px] px-4 font-bold text-[11px] uppercase tracking-wide transition-all">Won</Button>
                        <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-[4px] h-[30px] px-4 font-bold text-[11px] uppercase tracking-wide transition-all">Lost</Button>
                    </div>
                    
                    {/* Stage Bar */}
                    <div className="flex items-center h-full">
                        {columns.map((col, idx) => {
                            const isActive = viewingCard.status === col.title;
                            return (
                                <div 
                                    key={col.title}
                                    className={`relative flex items-center h-[30px] px-6 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer
                                        ${isActive ? 'bg-[#71639e] text-white shadow-inner' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}
                                        ${idx !== 0 ? 'ml-[-12px]' : ''}
                                    `}
                                    style={{
                                        clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 8% 50%)',
                                        zIndex: columns.length - idx,
                                        paddingLeft: idx === 0 ? '1rem' : '1.8rem'
                                    }}
                                >
                                    {col.title}
                                    {isActive && <span className="ml-2 text-[8px] opacity-60 normal-case font-medium">3h</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Main Form Content */}
                <div className="flex flex-1 overflow-hidden bg-white">
                    {/* Left Side: Detail Form */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6 pb-20">
                        <div className="max-w-4xl mx-auto">
                            
                            {/* Header Stats */}
                            <div className="flex justify-end gap-1.5 mb-8">
                                <div className="border border-slate-200 rounded-[3px] px-3 py-1 flex items-center gap-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <Calendar className="h-3.5 w-3.5 text-[#71639e]" />
                                    <span>No Meeting</span>
                                </div>
                                <div className="border border-slate-200 rounded-[3px] px-3 py-1 flex items-center gap-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <StickyNote className="h-3.5 w-3.5 text-[#71639e]" />
                                    <span>0 Quotations</span>
                                </div>
                            </div>

                            {/* Title & Stars */}
                            <div className="mb-10 group/title">
                                <input 
                                    className="text-4xl font-medium text-slate-900 w-full outline-none border-b-2 border-transparent focus:border-blue-500 py-1 transition-all"
                                    defaultValue={viewingCard.opportunity}
                                    placeholder="Opportunity's name..."
                                />
                                <div className="flex items-center gap-1 mt-3">
                                    {[1,2,3].map(i => (
                                        <Star key={i} className={`h-4 w-4 cursor-pointer transition-colors ${i <= viewingCard.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200 hover:text-amber-200'}`} />
                                    ))}
                                    <Clock className="h-3.5 w-3.5 text-slate-300 ml-2" />
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-2 gap-x-20 gap-y-6">
                                {/* Left Fields */}
                                <div className="space-y-4">
                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36 flex items-center gap-1">
                                            Expected Revenue
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 flex items-center gap-3 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <input className="outline-none text-[13px] w-full font-medium bg-transparent" defaultValue={viewingCard.value} />
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-baseline group mt-1">
                                        <label className="text-[13px] font-bold text-slate-700 w-36 flex items-center gap-1">
                                            Probability
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 flex items-center gap-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <span className="text-slate-400 text-[11px]">at</span>
                                            <input className="outline-none text-[13px] w-14 font-medium bg-transparent text-center" defaultValue="50.00" />
                                            <span className="text-slate-500 font-bold ml-1">%</span>
                                            <Wand2 className="h-3.5 w-3.5 text-amber-500 ml-auto cursor-pointer" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group pt-4">
                                        <label className="text-[13px] font-bold text-slate-700 w-36 flex items-center gap-1">
                                            Contact
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 flex items-center gap-2 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <div className="h-4 w-4 bg-[#71BB32] rounded-[2px] flex items-center justify-center text-white text-[9px] font-black">
                                                {viewingCard.company.charAt(0)}
                                            </div>
                                            <input className="outline-none text-[13px] w-full font-medium text-blue-600 bg-transparent" defaultValue={viewingCard.company} />
                                            <ExternalLink className="h-3 w-3 text-slate-400 cursor-pointer" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36">Email</label>
                                        <div className="flex-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <input className="outline-none text-[13px] w-full bg-transparent" defaultValue="ngotu410@gmail.com" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36">Phone</label>
                                        <div className="flex-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <input className="outline-none text-[13px] w-full bg-transparent" defaultValue="0865839318" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Fields */}
                                <div className="space-y-4">
                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36">Salesperson</label>
                                        <div className="flex-1 flex items-center gap-2 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <div className="h-5 w-5 rounded bg-[#B35227] flex items-center justify-center text-white text-[10px] font-bold">A</div>
                                            <input className="outline-none text-[13px] w-full font-medium bg-transparent" defaultValue="Administrator" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36 flex items-center gap-1">
                                            Expected Closing
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <input className="outline-none text-[13px] w-full bg-transparent placeholder:text-slate-300 italic font-normal" placeholder="No closing estimate" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36 flex items-center gap-1">
                                            Tags
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5 min-h-[31px]">
                                            <span className="text-[11px] text-slate-300 italic font-normal">Add a tag...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Section */}
                            <div className="mt-16">
                                <div className="flex gap-10 border-b border-slate-200">
                                    <button className="text-[13px] font-bold text-slate-800 border-b-2 border-blue-600 pb-2.5 transition-all">Notes</button>
                                    <button className="text-[13px] font-bold text-slate-400 hover:text-slate-600 pb-2.5 transition-all">Contacts</button>
                                </div>
                                <div className="py-6 min-h-[150px]">
                                    <textarea 
                                        className="w-full text-[13px] outline-none bg-transparent placeholder:text-slate-200 resize-none leading-relaxed"
                                        placeholder="Add a description..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Chatter (History Log) */}
                    <div className="w-[450px] border-l border-slate-200 bg-[#f8f9fa] flex flex-col shadow-inner">
                        {/* Chatter Controls */}
                        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-3 flex items-center justify-between sticky top-0 z-10 shrink-0">
                            <div className="flex gap-1">
                                <button className="bg-[#71639e] hover:bg-[#63568c] text-white h-7 px-3 text-[10px] font-bold uppercase rounded-[3px] transition-all shadow-sm">Send message</button>
                                <button className="text-slate-600 hover:bg-slate-200 h-7 px-3 text-[10px] font-bold uppercase rounded-[3px] transition-all">Log note</button>
                                <button className="text-slate-600 hover:bg-slate-200 h-7 px-3 text-[10px] font-bold uppercase rounded-[3px] transition-all">Activity</button>
                            </div>
                            <div className="flex items-center gap-2.5 text-slate-400">
                                <Search className="h-3.5 w-3.5 hover:text-slate-600 cursor-pointer" />
                                <Paperclip className="h-3.5 w-3.5 hover:text-slate-600 cursor-pointer" />
                                <div className="h-5 w-5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-500">A</div>
                            </div>
                        </div>

                        {/* History Log */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {[
                                { user: "Administrator", time: "2:50 PM", action: "Stage changed", detail: "New → Qualified (Stage)" },
                                { user: "Administrator", time: "2:35 PM", action: "Stage changed", detail: "Qualified → New (Stage)" },
                                { user: "Administrator", time: "2:22 PM", action: "Stage changed", detail: "New → Qualified (Stage)" },
                                { user: "Administrator", time: "2:09 PM", action: "Stage changed", detail: "Won → Pending (Won/Lost)" },
                                { user: "Administrator", time: "2:09 PM", action: "Stage changed", detail: "Won → New (Stage)" },
                                { user: "Administrator", time: "1:55 PM", action: "Opportunity won", detail: "Pending → Won (Won/Lost)" }
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4 group/log animate-in slide-in-from-right-2 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="h-8 w-8 rounded-[4px] bg-[#B35227] shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1 shadow-sm">
                                        {log.user.charAt(0)}
                                    </div>
                                    <div className="flex-1 border-b border-slate-100 pb-4 group-last/log:border-none">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-bold text-slate-800">{log.user}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                                        </div>
                                        <div className="text-[12px] text-slate-600 mt-1 font-medium italic">{log.action}</div>
                                        <div className="text-[12px] text-blue-600 font-bold mt-1 flex items-center gap-1.5">
                                            <ArrowRightLeft className="h-2.5 w-2.5" />
                                            {log.detail}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (activeView === "list") {
        return (
            <div className="flex flex-col h-full bg-white animate-in fade-in duration-500 overflow-hidden">
                <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-white z-20 border-b border-slate-200 shadow-sm">
                            <tr className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded" /></th>
                                <th className="px-4 py-3 w-[25%] font-black">Opportunity</th>
                                <th className="px-4 py-3 w-[15%]">Contact Name</th>
                                <th className="px-4 py-3 w-[20%]">Email</th>
                                <th className="px-4 py-3 w-[15%]">Salesperson</th>
                                <th className="px-4 py-3 w-[15%] text-right">Expected Revenue</th>
                                <th className="px-4 py-3 w-[10%]">Stage</th>
                                <th className="w-20 px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px]">
                            {columns.map(column => {
                                const stageCards = cards.filter(c => c.status === column.title);
                                const isCollapsed = collapsedListGroups.includes(column.title);
                                
                                return (
                                    <React.Fragment key={column.title}>
                                        {/* Group Header */}
                                        <tr 
                                            className="bg-slate-50 border-y border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors group"
                                            onClick={() => toggleListGroup(column.title)}
                                        >
                                            <td className="px-4 py-2.5">
                                                <Triangle 
                                                    className={`h-2.5 w-2.5 text-slate-400 transition-transform duration-200 fill-slate-400 ${!isCollapsed ? 'rotate-180' : 'rotate-90'}`} 
                                                />
                                            </td>
                                            <td colSpan={4} className="px-4 py-2.5 font-black text-slate-900 uppercase text-[12px] tracking-tight">
                                                {column.title} ({stageCards.length})
                                            </td>
                                            <td className="px-4 py-2.5 text-right font-black text-slate-700">
                                                {calculateStageTotal(column.title)}
                                            </td>
                                            <td colSpan={2}></td>
                                        </tr>

                                        {/* Group Rows */}
                                        {!isCollapsed && stageCards.length > 0 && stageCards.map(card => (
                                            <tr 
                                                key={card.id} 
                                                className="border-b border-slate-50 hover:bg-blue-50/20 transition-all group/row cursor-pointer"
                                                onClick={() => setViewingCard(card)}
                                            >
                                                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                                    <input type="checkbox" className="rounded border-slate-300" />
                                                </td>
                                                <td className="px-4 py-3 font-semibold text-slate-900 group-hover/row:text-blue-600 transition-colors">
                                                    {card.opportunity}
                                                </td>
                                                <td className="px-4 py-3 text-slate-500 font-medium">{card.company}</td>
                                                <td className="px-4 py-3 text-slate-500">ngotu410@gmail.com</td>
                                                <td className="px-4 py-3 flex items-center gap-2">
                                                    <div className="h-5 w-5 rounded bg-[#B35227] flex items-center justify-center text-white text-[9px] font-bold">A</div>
                                                    <span className="text-slate-600 font-medium">Administrator</span>
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-slate-900">{card.value}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border border-slate-200">
                                                        {card.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 opacity-0 group-row-hover:opacity-100 transition-opacity">
                                                    <div className="flex items-center gap-2.5">
                                                        <MessageCircle className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" />
                                                        <Mail className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-slate-50/30">
                                <td colSpan={5} className="px-4 py-5 text-right"></td>
                                <td className="px-4 py-5 text-right">
                                    <div className="border-t-2 border-slate-900 pt-1.5 inline-block">
                                        <p className="text-[15px] font-black text-slate-900 leading-none">{grandTotal}</p>
                                    </div>
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }

    const getCalendarDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const days = [];
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDay - i, currentMonth: false });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, currentMonth: true });
        }
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ day: i, currentMonth: false });
        }
        return days;
    };

    if (activeView === "calendar") {
        const days = getCalendarDays(calendarDate);
        const monthName = calendarDate.toLocaleString('default', { month: 'long' });
        const year = calendarDate.getFullYear();

        return (
            <div className="flex flex-col h-full bg-white animate-in fade-in duration-500 overflow-hidden">
                {/* Calendar Navigation Bar */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white z-20 shrink-0">
                    <div className="flex items-center gap-1">
                        <div className="flex bg-slate-100 rounded-[3px] p-0.5 border border-slate-200">
                            <button className="p-1 hover:bg-white hover:shadow-sm rounded-[2px] transition-all">
                                <ChevronLeftIcon className="h-4 w-4 text-slate-600" />
                            </button>
                            <button className="p-1 hover:bg-white hover:shadow-sm rounded-[2px] transition-all">
                                <ChevronRightIcon className="h-4 w-4 text-slate-600" />
                            </button>
                        </div>
                        <div className="ml-2 flex gap-1">
                            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-medium rounded-[3px] border border-slate-200 transition-all">
                                <div className="flex items-center gap-2">
                                    Month <ChevronDown className="h-3 w-3" />
                                </div>
                            </button>
                            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-medium rounded-[3px] border border-slate-200 transition-all">
                                Today
                            </button>
                        </div>
                        <h2 className="ml-4 text-[16px] font-bold text-slate-800">{monthName} {year}</h2>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Main Calendar Grid */}
                    <div className="flex-1 overflow-auto custom-scrollbar border-r border-slate-200">
                        <div className="grid grid-cols-7 border-b border-slate-200 sticky top-0 bg-white z-10">
                            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                                <div key={day} className="py-2 text-center text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-100 last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 auto-rows-fr h-full min-h-[600px]">
                            {days.map((d, i) => {
                                const isToday = d.day === 4 && d.currentMonth;
                                return (
                                    <div key={i} className={`border-r border-b border-slate-100 min-h-[120px] p-2 hover:bg-slate-50 transition-colors group relative ${!d.currentMonth ? 'bg-slate-50/50' : ''}`}>
                                        <div className="flex justify-start">
                                            <span className={`text-[12px] font-bold transition-all h-6 w-6 flex items-center justify-center rounded-full
                                                ${isToday ? 'bg-[#D12B2B] text-white' : d.currentMonth ? 'text-slate-700' : 'text-slate-300'}
                                            `}>
                                                {d.day}
                                            </span>
                                        </div>
                                        {/* Activity Area */}
                                        <div className="mt-2 space-y-1">
                                            {isToday && (
                                                <div 
                                                    className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-[2px] border-l-2 border-blue-500 font-medium truncate cursor-pointer hover:bg-blue-200 transition-colors"
                                                    onClick={() => cards[0] && setViewingCard(cards[0])}
                                                >
                                                    Meeting with Client...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Sidebar: Mini Calendar & Filter */}
                    <div className="w-[280px] bg-slate-50 flex flex-col shrink-0 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[13px] font-bold text-slate-700">{monthName} {year}</span>
                            <div className="flex gap-1">
                                <ChevronLeftIcon className="h-3.5 w-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                                <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                            </div>
                        </div>
                        
                        {/* Mini Calendar Grid */}
                        <div className="grid grid-cols-7 mb-6">
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                                <div key={i} className="text-center text-[10px] font-black text-slate-400 py-1">{day}</div>
                            ))}
                            {days.map((d, i) => (
                                <div 
                                    key={i} 
                                    className={`text-center text-[11px] py-1.5 cursor-pointer rounded-full transition-all
                                        ${d.day === 4 && d.currentMonth ? 'bg-[#D12B2B] text-white font-bold' : d.currentMonth ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-300'}
                                    `}
                                >
                                    {d.day}
                                </div>
                            ))}
                        </div>

                        {/* Additional Sidebar Content (Filter-like) */}
                        <div className="mt-auto border-t border-slate-200 pt-4 flex items-center justify-end">
                             <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Plus className="h-4 w-4 text-slate-400" />
                             </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white flex-1 min-h-0">
            {/* Kanban Board Container */}
            <div className="flex-1 overflow-x-auto py-6 bg-[#F9FAFB]">
                <div className="flex gap-6 min-w-max h-full items-start px-6">
                    {columns.map((column) => {
                        const isFolded = foldedColumns.includes(column.title);
                        
                        if (isFolded) {
                            return (
                                <div 
                                    key={column.title}
                                    className="w-12 h-[calc(100vh-200px)] bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 cursor-pointer hover:bg-slate-100 transition-colors group relative"
                                    onClick={() => toggleFold(column.title)}
                                >
                                    <div className="rotate-90 origin-center whitespace-nowrap absolute top-20 text-slate-500 font-bold tracking-wide">
                                        {column.title}
                                    </div>
                                    <div className="absolute top-4 flex flex-col items-center gap-4">
                                        <ChevronRightIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                                        <span className="text-[10px] font-bold text-slate-400">{cards.filter(c => c.status === column.title).length}</span>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div 
                                key={column.title} 
                                className={`w-80 flex flex-col gap-3 rounded-lg transition-colors p-2 relative ${dragOverColumn === column.title ? 'bg-blue-50/50 ring-2 ring-blue-200 ring-inset' : ''}`}
                                onDragOver={(e) => handleDragOver(e, column.title)}
                                onDrop={(e) => handleDrop(e, column.title)}
                                onDragLeave={() => setDragOverColumn(null)}
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between group h-10 border-b-2 border-slate-200 hover:border-blue-500 transition-colors cursor-pointer relative">
                                    <span className="font-bold text-slate-700">{column.title}</span>
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="relative">
                                            <Settings 
                                                className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveColumnMenu(activeColumnMenu === column.title ? null : column.title);
                                                }}
                                            />
                                            {activeColumnMenu === column.title && (
                                                <div className="absolute top-6 right-0 w-32 bg-white rounded-md shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in duration-150">
                                                    <button 
                                                        onClick={() => toggleFold(column.title)}
                                                        className="w-full px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                    >
                                                        <ArrowRightLeft className="h-3 w-3" /> Fold
                                                    </button>
                                                    <button className="w-full px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                                                        <Edit2 className="h-3 w-3" /> Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteColumn(column.title)}
                                                        className="w-full px-3 py-1.5 text-left text-xs text-rose-500 hover:bg-rose-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="h-3 w-3" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <Plus
                                            className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                                            onClick={() => setQuickCreateColumn(column.title)}
                                        />
                                    </div>
                                </div>

                                {/* Column Stats */}
                                <div className="flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-wider mb-2">
                                    <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-300 w-1/3"></div>
                                    </div>
                                    <span className="text-slate-900">{calculateColumnTotal(column.title)}</span>
                                </div>

                                {/* Quick Create Form */}
                                {quickCreateColumn === column.title && (
                                    <div className="bg-white rounded shadow-xl border border-slate-200 p-4 animate-in zoom-in duration-200 relative">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                                <Building2 className="h-3.5 w-3.5 text-slate-800" />
                                                <input
                                                    className="flex-1 text-sm outline-none placeholder:text-slate-300"
                                                    placeholder="Company"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                />
                                                <ChevronDown className="h-3 w-3 text-slate-400" />
                                            </div>
                                            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                                <User className="h-3.5 w-3.5 text-slate-800" />
                                                <input
                                                    className="flex-1 text-sm outline-none placeholder:text-slate-300"
                                                    placeholder="Contact"
                                                    value={formData.contact}
                                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                                <Briefcase className="h-3.5 w-3.5 text-slate-800" />
                                                <input
                                                    className="flex-1 text-sm outline-none font-bold placeholder:font-normal placeholder:text-slate-300"
                                                    placeholder="Opportunity's Name"
                                                    value={formData.opportunity}
                                                    onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                                <Mail className="h-3.5 w-3.5 text-slate-800" />
                                                <input
                                                    className="flex-1 text-sm outline-none placeholder:text-slate-300"
                                                    placeholder="Contact Email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                                <Phone className="h-3.5 w-3.5 text-slate-800" />
                                                <input
                                                    className="flex-1 text-sm outline-none placeholder:text-slate-300"
                                                    placeholder="Contact Phone"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <CircleDollarSign className="h-3.5 w-3.5 text-slate-800" />
                                                    <input
                                                        className="w-20 text-sm outline-none font-bold"
                                                        value={formData.value}
                                                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3].map(i => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 cursor-pointer ${i <= formData.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                                                            onClick={() => setFormData({ ...formData, stars: i })}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={handleAddCard}
                                                        className="bg-blue-600 hover:bg-blue-700 h-8 px-4"
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="bg-slate-100 h-8 px-4 font-bold">Edit</Button>
                                                </div>
                                                <button
                                                    className="p-2 hover:bg-slate-100 rounded text-slate-400"
                                                    onClick={() => setQuickCreateColumn(null)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3 pb-8 min-h-[150px]">
                                    {cards.filter(c => c.status === column.title).map((card) => (
                                        <div
                                            key={card.id}
                                            id={`card-${card.id}`}
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, card.id)}
                                            onDragEnd={handleDragEnd}
                                            className={`bg-white rounded border border-slate-200 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer active:cursor-grabbing group relative ${draggingCardId === card.id ? 'opacity-20 scale-95 shadow-none' : ''}`}
                                            onClick={() => setViewingCard(card)}
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex justify-between items-start pr-6">
                                                    <h3 className="font-bold text-slate-800 text-[15px]">{card.opportunity}</h3>
                                                    <div className="absolute top-2 right-1 flex flex-col items-end">
                                                        <button 
                                                            className="p-1 hover:bg-slate-50 rounded text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveCardMenu(activeCardMenu === card.id ? null : card.id);
                                                            }}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>

                                                        {activeCardMenu === card.id && (
                                                            <div className="absolute top-8 right-0 w-28 bg-white rounded shadow-lg border border-slate-100 py-1 z-[60] animate-in fade-in zoom-in duration-150">
                                                                <button 
                                                                    className="w-full px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setViewingCard(card);
                                                                        setActiveCardMenu(null);
                                                                    }}
                                                                >
                                                                    <Edit2 className="h-3 w-3" /> Edit
                                                                </button>
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        deleteCard(card.id);
                                                                    }}
                                                                    className="w-full px-3 py-1.5 text-left text-xs text-rose-500 hover:bg-rose-50 flex items-center gap-2"
                                                                >
                                                                    <Trash2 className="h-3 w-3" /> Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <p className="text-[14px] text-slate-900 font-medium mb-1">{card.value}</p>
                                                
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="h-5 w-5 rounded bg-[#71BB32] flex items-center justify-center text-white text-[10px] font-black">
                                                        {card.company.charAt(0)}
                                                    </div>
                                                    <p className="text-[13px] text-slate-600 font-medium">{card.company}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="flex gap-0.5">
                                                            {[1, 2, 3].map(i => (
                                                                <Star key={i} className={`h-3.5 w-3.5 ${i <= card.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                                            ))}
                                                        </div>
                                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                    </div>
                                                    <div className="h-6 w-6 rounded bg-[#B35227] flex items-center justify-center text-white text-[10px] font-bold">
                                                        A
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Stage Button */}
                    <div className="w-64 pt-2">
                        {isAddingStage ? (
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 space-y-3">
                                <input
                                    autoFocus
                                    className="w-full text-sm font-medium border-b border-blue-600 outline-none pb-1"
                                    placeholder="Stage Name"
                                    value={newStageName}
                                    onChange={(e) => setNewStageName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddStage()}
                                />
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={handleAddStage}>Add</Button>
                                    <Button variant="ghost" size="sm" onClick={() => setIsAddingStage(false)}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div 
                                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors px-2 py-1"
                                onClick={() => setIsAddingStage(true)}
                            >
                                <Plus className="h-4 w-4" />
                                <span className="text-sm font-medium italic">+ Add Stage</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Generate Leads Modal */}
            <Dialog open={showGenerateLeads} onOpenChange={setShowGenerateLeads}>
                <DialogContent className="sm:max-w-[700px] p-0 gap-0 border-none rounded-none shadow-2xl overflow-hidden">
                    <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between border-b border-slate-100 bg-white">
                        <DialogTitle className="text-lg font-medium text-slate-800">Need help reaching your target?</DialogTitle>
                    </DialogHeader>

                    <div className="p-8 space-y-8 bg-white">
                        <div>
                            <h2 className="text-2xl font-normal text-slate-900 mb-6">How many leads would you like?</h2>
                            <div className="flex items-end gap-4 border-b border-blue-600 pb-1 w-fit min-w-[300px]">
                                <input
                                    type="number"
                                    className="text-xl font-medium outline-none w-12 text-blue-600"
                                    value={generateLeadsData.count}
                                    onChange={(e) => setGenerateLeadsData({ ...generateLeadsData, count: parseInt(e.target.value) || 0 })}
                                />
                                <span className="text-slate-500 text-lg">Companies</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-700 w-20 uppercase tracking-tight">Countries</span>
                                    <div className="flex flex-wrap gap-2">
                                        {generateLeadsData.countries.map(country => (
                                            <div key={country} className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 group">
                                                {country}
                                                <X
                                                    className="h-3 w-3 cursor-pointer opacity-40 group-hover:opacity-100"
                                                    onClick={() => setGenerateLeadsData({
                                                        ...generateLeadsData,
                                                        countries: generateLeadsData.countries.filter(c => c !== country)
                                                    })}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-700 w-20 uppercase tracking-tight">Industries</span>
                                    <div className="flex-1 border-b border-slate-300">
                                        <input
                                            className="w-full py-1 text-sm outline-none bg-transparent"
                                            value={generateLeadsData.industries}
                                            onChange={(e) => setGenerateLeadsData({ ...generateLeadsData, industries: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-700 w-20 uppercase tracking-tight">Filter on Size</span>
                                    <div
                                        className={`w-4 h-4 border-2 rounded flex items-center justify-center cursor-pointer transition-colors ${generateLeadsData.filterOnSize ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}
                                        onClick={() => setGenerateLeadsData({ ...generateLeadsData, filterOnSize: !generateLeadsData.filterOnSize })}
                                    >
                                        {generateLeadsData.filterOnSize && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-500 w-24">Sales Team</span>
                                    <span className="text-sm text-slate-800">Sales</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-500 w-24">Salesperson</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded bg-[#B35227] flex items-center justify-center text-white text-[10px] font-bold">
                                            A
                                        </div>
                                        <span className="text-sm text-slate-800">Administrator</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-500 w-24">Default Tags</span>
                                    <div className="flex-1 min-h-[1.5rem] border-b border-slate-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-row justify-start gap-2">
                        <Button
                            className="bg-[#71639e] hover:bg-[#63568c] text-white px-6 h-10 font-bold rounded"
                            onClick={() => setShowGenerateLeads(false)}
                        >
                            Generate Leads
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 h-10 font-bold rounded"
                            onClick={() => setShowGenerateLeads(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

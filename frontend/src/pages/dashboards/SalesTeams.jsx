import React, { useState } from "react";
import { 
    Settings, 
    Plus, 
    MoreHorizontal,
    Search,
    ChevronLeft,
    ChevronRight,
    Paperclip,
    ExternalLink,
    History,
    User,
    Mail,
    MessageSquare,
    StickyNote,
    Calendar,
    MessageCircle,
    Star,
    Trash2,
    Wand2,
    Clock,
    ChevronDown,
    Activity,
    ArrowRightLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SalesTeams() {
    const [teams, setTeams] = useState([
        { id: 1, name: "Sales", alias: "info", leader: "Administrator", avatar: "A", email: "admin@pcwms.com" }
    ]);
    const [viewingTeam, setViewingTeam] = useState(null);

    if (viewingTeam) {
        return (
            <div className="flex flex-col h-full bg-[#f8f9fa] flex-1 min-h-0">
                {/* Form Header (Tier 2-ish) */}
                <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between sticky top-0 z-10 h-10">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span 
                            className="cursor-pointer hover:text-blue-600 font-medium transition-colors"
                            onClick={() => setViewingTeam(null)}
                        >
                            Sales Teams
                        </span>
                        <span className="text-slate-400 font-light">/</span>
                        <span className="text-slate-900 font-bold">{viewingTeam.name}</span>
                        <Settings className="h-3 w-3 text-slate-400 ml-1 cursor-pointer hover:text-slate-600" />
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium">1 / 1</span>
                            <div className="flex border border-slate-200 rounded-[3px] overflow-hidden">
                                <button className="p-1 hover:bg-slate-50 border-r border-slate-200 transition-colors">
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                </button>
                                <button className="p-1 hover:bg-slate-50 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Action Bar */}
                <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shadow-sm z-[5]">
                    <div className="flex items-center gap-1.5">
                        <Button 
                            className="bg-[#71639e] hover:bg-[#63568c] text-white rounded-[4px] h-[30px] px-4 font-bold text-[11px] uppercase tracking-wide transition-all shadow-sm"
                            onClick={() => setViewingTeam(null)}
                        >
                            New
                        </Button>
                        <Button 
                            variant="outline" 
                            className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-[4px] h-[30px] px-4 font-bold text-[11px] uppercase tracking-wide transition-all"
                            onClick={() => setViewingTeam(null)}
                        >
                            Discard
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Main Form Area (Sheet look) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6 pb-20 bg-white">
                        <div className="max-w-4xl mx-auto">
                            
                            {/* Title & Stats Shortcut */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Sales Team</p>
                                    <input 
                                        className="text-4xl font-medium text-slate-900 w-full outline-none border-b-2 border-transparent focus:border-blue-500 py-1 transition-all"
                                        defaultValue={viewingTeam.name}
                                    />
                                </div>
                                <div className="flex gap-1.5 mt-4">
                                    <div className="border border-slate-200 rounded-[3px] px-3 py-1 flex items-center gap-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors group">
                                        <Activity className="h-3.5 w-3.5 text-[#71639e]" />
                                        <span>Opportunities</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-2 gap-x-20 gap-y-6 mb-12">
                                {/* Left Fields */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 mb-2">Team Details</h3>
                                    
                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36">Team Leader</label>
                                        <div className="flex-1 flex items-center gap-2 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <div className="h-5 w-5 rounded bg-amber-600 flex items-center justify-center text-white text-[10px] font-bold">
                                                {viewingTeam.avatar}
                                            </div>
                                            <input className="outline-none text-[13px] w-full font-medium bg-transparent" defaultValue={viewingTeam.leader} />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-36 flex items-center gap-1">
                                            Email Alias
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 flex items-center gap-2 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5">
                                            <input className="outline-none text-[13px] w-full font-medium bg-transparent" defaultValue={viewingTeam.alias} />
                                            <span className="text-[11px] text-slate-400 italic">@ e.g. mycompany.com</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Fields */}
                                <div className="space-y-4 pt-6">
                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-40 shrink-0">Accept Emails From</label>
                                        <div className="flex-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5 flex items-center justify-between">
                                            <span className="text-[13px] text-slate-800 font-medium">Everyone</span>
                                            <ChevronDown className="h-3 w-3 text-slate-400" />
                                        </div>
                                    </div>

                                    <div className="flex items-baseline group">
                                        <label className="text-[13px] font-bold text-slate-700 w-40 shrink-0 flex items-center gap-1">
                                            Invoicing Target
                                            <span className="text-blue-500 font-black cursor-help italic text-[10px]">?</span>
                                        </label>
                                        <div className="flex-1 border-b border-slate-200 group-focus-within:border-blue-500 transition-colors pb-1.5 flex items-center gap-2">
                                            <span className="text-[13px] text-slate-800 font-bold">0.00</span>
                                            <span className="text-[11px] text-slate-400">/ Month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Section */}
                            <div className="mt-16">
                                <div className="flex gap-10 border-b border-slate-200">
                                    <button className="text-[13px] font-bold text-slate-800 border-b-2 border-blue-600 pb-2.5 transition-all">Members</button>
                                </div>
                                <div className="py-6 grid grid-cols-2 gap-4 min-h-[150px]">
                                    <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group shadow-sm">
                                        <div className="h-10 w-10 rounded bg-amber-600 flex items-center justify-center text-lg text-white font-black shadow-inner">
                                            {viewingTeam.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-900 text-[13px]">{viewingTeam.leader}</h4>
                                            <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                                                <Mail className="h-3 w-3" />
                                                <span className="truncate">{viewingTeam.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-2 border-dashed border-slate-200 rounded-[4px] p-4 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all cursor-pointer bg-slate-50/50 group">
                                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-[13px] font-bold">Add Salespersons</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Chatter (History Log) */}
                    <div className="w-[450px] border-l border-slate-200 bg-[#f8f9fa] flex flex-col shadow-inner">
                        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-3 flex items-center justify-between sticky top-0 z-10 shrink-0">
                            <div className="flex gap-1">
                                <button className="bg-[#71639e] hover:bg-[#63568c] text-white h-7 px-3 text-[10px] font-bold uppercase rounded-[3px] transition-all shadow-sm">Send message</button>
                                <button className="text-slate-600 hover:bg-slate-200 h-7 px-3 text-[10px] font-bold uppercase rounded-[3px] transition-all">Log note</button>
                                <button className="text-slate-600 hover:bg-slate-200 h-7 px-3 text-[10px] font-bold uppercase rounded-[3px] transition-all">Activity</button>
                            </div>
                            <div className="flex items-center gap-2.5 text-slate-400">
                                <Search className="h-3.5 w-3.5 hover:text-slate-600 cursor-pointer" />
                                <Paperclip className="h-3.5 w-3.5 hover:text-slate-600 cursor-pointer" />
                                <div className="h-5 w-5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                    {viewingTeam.avatar}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            <div className="relative text-center">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                                <span className="relative bg-[#f8f9fa] px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Today</span>
                            </div>

                            <div className="flex gap-4 group/log">
                                <div className="h-8 w-8 rounded-[4px] bg-purple-600 shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1 shadow-sm">
                                    OB
                                </div>
                                <div className="flex-1 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-bold text-slate-800">OdooBot</span>
                                        <span className="text-[10px] text-slate-400 font-medium">11:39 AM</span>
                                    </div>
                                    <div className="text-[12px] text-slate-600 mt-1 font-medium italic">Sales Team created</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] flex-1 min-h-0">
            {/* Header Tier 2 - Actions & Search */}
            <div className="h-14 border-b border-slate-200 bg-white flex items-center px-6 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-2">
                    <Button className="bg-[#71639e] hover:bg-[#63568c] text-white font-bold rounded-[4px] px-4 h-8 animate-in zoom-in duration-300 shadow-sm text-[12px] uppercase tracking-wide">
                        New
                    </Button>
                    <div className="flex items-center gap-1 ml-4 text-[16px] font-bold text-slate-800">
                        Sales Teams <Settings className="h-4 w-4 text-slate-400 cursor-pointer hover:rotate-45 transition-transform" />
                    </div>
                </div>

                <div className="flex-1 max-w-2xl px-12">
                   <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input 
                            placeholder="Search..." 
                            className="bg-slate-50 border border-slate-200 h-10 w-full pl-10 rounded-[4px] focus-visible:ring-2 focus-visible:ring-blue-500/10 transition-all font-medium text-sm"
                        />
                   </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400 tracking-tight">1-1 / 1</span>
                    <div className="flex bg-slate-100 rounded-[3px] p-0.5 border border-slate-200">
                        <button className="p-1 hover:bg-white rounded-[2px] shadow-sm hover:shadow-md transition-all active:scale-95">
                            <ChevronLeft className="h-4 w-4 text-slate-600" />
                        </button>
                        <button className="p-1 hover:bg-white rounded-[2px] shadow-sm hover:shadow-md transition-all active:scale-95">
                            <ChevronRight className="h-4 w-4 text-slate-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Area (Standard ListView look) */}
            <div className="flex-1 overflow-auto p-6 bg-[#F9FAFB] custom-scrollbar">
                <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-white z-10 border-b border-slate-200 shadow-sm">
                            <tr className="bg-slate-50/50">
                                <th className="w-12 px-6 py-3">
                                    <input type="checkbox" className="rounded border-slate-300" />
                                </th>
                                <th className="px-6 py-3 text-[11px] font-black text-slate-700 uppercase tracking-widest">Sales Team</th>
                                <th className="px-6 py-3 text-[11px] font-black text-slate-700 uppercase tracking-widest">Alias</th>
                                <th className="px-6 py-3 text-[11px] font-black text-slate-700 uppercase tracking-widest">Team Leader</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px]">
                            {teams.map(team => (
                                <tr 
                                    key={team.id} 
                                    className="border-b border-slate-50 hover:bg-blue-50/20 transition-all group cursor-pointer"
                                    onClick={() => setViewingTeam(team)}
                                >
                                    <td className="px-6 py-3.5" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-3">
                                            <MoreHorizontal className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab hover:text-slate-600" />
                                            <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {team.name}
                                    </td>
                                    <td className="px-6 py-3.5 text-slate-500 font-medium italic opacity-70">
                                        {team.alias}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-6 w-6 rounded bg-amber-600 flex items-center justify-center text-[10px] text-white font-black shadow-sm shadow-amber-200">
                                                {team.avatar}
                                            </div>
                                            <span className="text-slate-800 font-bold">{team.leader}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

import { Bell, Search, Command, Menu } from "lucide-react";

export default function Header({ onSearch }) {
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-white/[0.07] bg-[#090a17]/85 px-5 backdrop-blur-2xl md:px-8">
      <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600"><span className="text-slate-500">Workspace</span><span>/</span><span className="text-slate-200">Overview</span></div>
      <div className="flex items-center gap-3 sm:gap-5">
        <label className="hidden w-[250px] items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2.5 transition focus-within:border-violet-400/40 sm:flex"><Search size={14} className="shrink-0 text-slate-500"/><input onChange={(e)=>onSearch?.(e.target.value)} placeholder="Search projects or clients..." className="min-w-0 flex-1 bg-transparent text-[11px] text-slate-200 outline-none placeholder:text-slate-600"/><span className="flex items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-slate-600"><Command size={10}/> K</span></label>
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold text-emerald-300 md:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"/>Workspace active</div>
        <button aria-label="Notifications" className="relative rounded-xl p-2 text-slate-500 transition hover:bg-white/[0.05] hover:text-white"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400"/></button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-500 to-indigo-600 text-[11px] font-bold text-white shadow-lg shadow-violet-950/40">A</div>
      </div>
    </header>
  );
}

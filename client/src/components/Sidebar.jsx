import { LayoutDashboard, FolderKanban, ChartNoAxesCombined, Settings, Sparkles, Workflow } from "lucide-react";

const links = [
  { name: "Overview", icon: LayoutDashboard, href: "#overview" },
  { name: "Projects", icon: FolderKanban, href: "#projects" },
  { name: "Analytics", icon: ChartNoAxesCombined, href: "#analytics" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0b0b19]/95 px-5 py-6 backdrop-blur-xl lg:flex">
      <a href="#overview" className="mb-12 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/50"><Workflow size={21} className="text-white" /></div>
        <div><div className="text-[19px] font-extrabold tracking-tight text-white">onboard<span className="text-violet-400">hq</span></div><p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[.22em] text-slate-500">Client operations</p></div>
      </a>
      <p className="mb-3 px-3 text-[9px] font-extrabold tracking-[.22em] text-slate-600">WORKSPACE</p>
      <nav className="space-y-1.5">
        {links.map(({ name, icon: Icon, href }, index) => <a key={name} href={href} className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 text-[13px] font-semibold transition-all ${index === 0 ? "border-violet-400/20 bg-violet-500/[0.13] text-violet-200 shadow-[inset_2px_0_0_#a78bfa]" : "border-transparent text-slate-500 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-slate-200"}`}><Icon size={17} className={index === 0 ? "text-violet-300" : "text-slate-500 group-hover:text-slate-300"}/>{name}{index===0&&<span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_9px_#a78bfa]"/>}</a>)}
      </nav>
      <div className="mt-auto rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.13] to-indigo-500/[0.04] p-4">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-violet-300"><Sparkles size={17}/></div>
        <p className="text-[13px] font-bold text-slate-100">Your AI operations layer</p>
        <p className="mt-2 text-[11px] leading-5 text-slate-500">Use Claude to create and manage onboarding projects through the connected MCP tools.</p>
        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3 text-[10px] font-semibold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>MCP endpoint deployed</div>
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-white/[0.07] px-2 pt-5"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold text-white">A</div><div className="min-w-0"><p className="text-xs font-semibold text-slate-200">Workspace admin</p><p className="text-[10px] text-slate-600">OnboardHQ workspace</p></div><Settings size={15} className="ml-auto text-slate-600"/></div>
    </aside>
  );
}

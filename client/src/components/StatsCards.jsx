import { FolderKanban, Clock3, CircleAlert, CheckCircle2, ArrowUpRight } from "lucide-react";

const cards = [
  { key: "total", label: "Total projects", note: "Across your workspace", icon: FolderKanban, tone: "violet", iconClass: "text-violet-300", bg: "bg-violet-400/10", glow: "from-violet-500/10" },
  { key: "active", label: "In progress", note: "Currently being worked on", icon: Clock3, tone: "cyan", iconClass: "text-cyan-300", bg: "bg-cyan-400/10", glow: "from-cyan-500/[0.08]" },
  { key: "pending", label: "Pending", note: "Awaiting kickoff", icon: CircleAlert, tone: "amber", iconClass: "text-amber-300", bg: "bg-amber-400/10", glow: "from-amber-500/[0.08]" },
  { key: "completed", label: "Completed", note: "Successfully finalized", icon: CheckCircle2, tone: "emerald", iconClass: "text-emerald-300", bg: "bg-emerald-400/10", glow: "from-emerald-500/[0.08]" },
];

export default function StatsCards({ stats }) {
  return <div className="grid grid-cols-2 gap-3.5 xl:grid-cols-4">{cards.map(({key,label,note,icon:Icon,iconClass,bg,glow},i)=><article key={key} style={{animationDelay:`${i*70}ms`}} className={`panel fade-up relative overflow-hidden rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-300/20 sm:p-5`}><div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} to-transparent opacity-80`}/><div className="relative flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${iconClass}`}><Icon size={19}/></div><ArrowUpRight size={15} className="text-slate-700"/></div><p className="relative mt-5 text-[11px] font-semibold text-slate-400">{label}</p><div className="relative mt-1 flex items-end justify-between"><h2 className="text-[30px] font-bold leading-none tracking-tight text-white sm:text-[34px]">{stats[key] ?? 0}</h2><span className="mb-0.5 text-[9px] text-slate-600">LIVE COUNT</span></div><p className="relative mt-3 text-[10px] text-slate-600">{note}</p></article>)}</div>;
}

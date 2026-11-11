import { Pencil, Trash2, Users, ListTodo, ArrowUpRight, Mail, Check } from "lucide-react";

const statusStyles = {
  pending: "border-amber-400/20 bg-amber-400/[0.08] text-amber-300",
  "in-progress": "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300",
  completed: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
};
const statusLabels = { pending: "Pending", "in-progress": "In progress", completed: "Completed" };

export default function ProjectCard({ project, onEdit, onDelete, onTaskToggle, onStatusChange }) {
  const tasks = project.tasks || [];
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  return (
    <article className="panel group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:shadow-[0_18px_55px_rgba(0,0,0,.25)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-400/[0.09] text-violet-300"><ListTodo size={19}/></div>
        <div className="flex items-center gap-1 opacity-70 transition group-hover:opacity-100"><button onClick={()=>onEdit(project)} aria-label="Edit project" className="rounded-lg p-2 text-slate-500 transition hover:bg-violet-400/10 hover:text-violet-200"><Pencil size={15}/></button><button onClick={()=>onDelete(project)} aria-label="Delete project" className="rounded-lg p-2 text-slate-500 transition hover:bg-red-400/10 hover:text-red-300"><Trash2 size={15}/></button></div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="break-words text-[15px] font-bold tracking-tight text-slate-100">{project.projectName}</h3><p className="mt-2 flex items-center gap-2 text-[11px] text-slate-400"><Users size={13} className="text-slate-600"/>{project.clientName}</p></div><span className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold ${statusStyles[project.status] || statusStyles.pending}`}>{statusLabels[project.status] || "Pending"}</span></div>
      <p className="mt-2 flex min-w-0 items-center gap-2 break-all text-[10px] text-slate-600"><Mail size={12} className="shrink-0"/>{project.clientEmail}</p>
      <div className="mt-6"><div className="mb-2 flex items-center justify-between text-[10px]"><span className="font-semibold text-slate-500">Onboarding progress</span><span className="font-bold tabular-nums text-violet-300">{progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-300 transition-all duration-700" style={{width:`${progress}%`}}/></div></div>
      <div className="mt-5 space-y-3">{tasks.length ? tasks.map((task,index)=><label key={task._id||index} className="flex cursor-pointer items-start gap-2.5 text-[11px] text-slate-400"><input type="checkbox" checked={Boolean(task.completed)} onChange={()=>onTaskToggle(project,index)} className="peer sr-only"/><span className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${task.completed?"border-violet-400 bg-violet-500 text-white":"border-slate-600 bg-transparent text-transparent peer-hover:border-violet-400"}`}><Check size={10}/></span><span className={task.completed?"text-slate-600 line-through":""}>{task.title}</span></label>) : <p className="text-[11px] text-slate-600">No onboarding tasks added yet.</p>}</div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4"><span className="text-[10px] text-slate-600">{completed} of {total} tasks complete</span><select aria-label="Project status" value={project.status} onChange={(e)=>onStatusChange(project,e.target.value)} className="max-w-[130px] rounded-lg border border-white/[0.08] bg-[#17162b] px-2.5 py-2 text-[10px] font-semibold text-slate-300 outline-none transition focus:border-violet-400/50"><option value="pending">Pending</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></div>
      <div className="mt-3 flex justify-end"><span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-violet-400/80">Manage project <ArrowUpRight size={11}/></span></div>
    </article>
  );
}

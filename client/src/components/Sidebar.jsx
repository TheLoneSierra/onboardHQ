
import { LayoutDashboard, FolderKanban, Sparkles } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="hidden md:flex w-64 min-h-screen bg-white border-r border-slate-200 flex-col px-5 py-7">
            <div className="flex items-center gap-3 mb-12">
                <div className="bg-violet-600 text-white p-2.5 rounded-xl">
                    <FolderKanban size={22} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">
                    onboard<span className="text-violet-600">hq</span>
                </h1>
            </div>

            <p className="text-xs font-semibold text-slate-400 tracking-widest mb-4">
                WORKSPACE
            </p>

            <nav className="space-y-2">
                <a href="#overview" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-50 text-violet-700 font-semibold text-sm">
                    <LayoutDashboard size={19} /> Overview
                </a>
                <a href="#projects" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 text-sm">
                    <FolderKanban size={19} /> Projects
                </a>
            </nav>

            <div className="mt-auto bg-violet-50 rounded-2xl p-4">
                <Sparkles className="text-violet-600 mb-3" size={22} />
                <h3 className="font-semibold text-sm text-slate-800">AI-powered onboarding</h3>
                <p className="text-xs text-slate-500 mt-2 leading-5">
                    Manage client projects with help from your AI assistant.
                </p>
            </div>
        </aside>
    );
}

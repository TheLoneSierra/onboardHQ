
import { Bell, Search } from "lucide-react";

export default function Header() {
    return (
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-5 md:px-10">
            <div>
                <p className="text-xs text-slate-400">Workspace / Overview</p>
            </div>

            <div className="flex items-center gap-5">
                <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Workspace active
                </div>
                <button className="text-slate-500 hover:text-violet-600">
                    <Bell size={19} />
                </button>
                <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm">
                    A
                </div>
            </div>
        </header>
    );
}

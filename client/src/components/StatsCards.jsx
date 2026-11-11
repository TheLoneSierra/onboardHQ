
import {
    FolderKanban,
    Clock3,
    CircleAlert,
    CheckCircle2,
} from "lucide-react";

const cards = [
    {
        key: "total",
        label: "Total Projects",
        icon: FolderKanban,
        color: "violet",
    },
    {
        key: "active",
        label: "In Progress",
        icon: Clock3,
        color: "blue",
    },
    {
        key: "pending",
        label: "Pending",
        icon: CircleAlert,
        color: "amber",
    },
    {
        key: "completed",
        label: "Completed",
        icon: CheckCircle2,
        color: "emerald",
    },
];

const colors = {
    violet: "bg-violet-100 text-violet-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    emerald: "bg-emerald-100 text-emerald-600",
};

export default function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div key={card.key} className="bg-white border border-slate-200 rounded-2xl p-5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[card.color]}`}>
                            <Icon size={21} />
                        </div>

                        <p className="text-sm text-slate-500 mt-4">{card.label}</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-1">
                            {stats[card.key]}
                        </h2>
                    </div>
                );
            })}
        </div>
    );
}

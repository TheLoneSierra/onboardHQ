
import { Pencil, Trash2, Users, ListTodo } from "lucide-react";

export default function ProjectCard({
    project,
    onEdit,
    onDelete,
    onTaskToggle,
    onStatusChange,
}) {
    const completed = project.tasks.filter((task) => task.completed).length;
    const total = project.tasks.length;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    const statusStyles = {
        pending: "bg-amber-100 text-amber-700",
        "in-progress": "bg-blue-100 text-blue-700",
        completed: "bg-emerald-100 text-emerald-700",
    };

    return (
        <article className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition">
            <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                    <ListTodo size={21} />
                </div>

                <div className="flex gap-2">
                    <button onClick={() => onEdit(project)} className="p-2 text-slate-400 hover:text-violet-600">
                        <Pencil size={17} />
                    </button>
                    <button onClick={() => onDelete(project)} className="p-2 text-slate-400 hover:text-red-500">
                        <Trash2 size={17} />
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-start gap-3 mt-5">
                <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-lg break-words">
                        {project.projectName}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
                        <Users size={15} /> {project.clientName}
                    </p>
                </div>

                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${statusStyles[project.status]}`}>
                    {project.status}
                </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 break-all">
                {project.clientEmail}
            </p>

            <div className="mt-6">
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">Task progress</span>
                    <span className="font-bold text-violet-600">{progress}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                        className="h-full bg-violet-600 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-5 space-y-3">
                {project.tasks.length ? (
                    project.tasks.map((task, index) => (
                        <label key={task._id || index} className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onTaskToggle(project, index)}
                                className="mt-0.5 accent-violet-600"
                            />
                            <span className={task.completed ? "line-through text-slate-400" : ""}>
                                {task.title}
                            </span>
                        </label>
                    ))
                ) : (
                    <p className="text-xs text-slate-400">No tasks added yet.</p>
                )}
            </div>

            <div className="border-t border-slate-100 mt-5 pt-4 flex justify-between items-center gap-3">
                <span className="text-xs text-slate-400">
                    {completed}/{total} tasks completed
                </span>

                <select
                    value={project.status}
                    onChange={(e) => onStatusChange(project, e.target.value)}
                    className="text-xs border border-slate-200 rounded-lg p-2 outline-none focus:border-violet-500"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </article>
    );
}

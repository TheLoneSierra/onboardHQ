
import { useEffect, useState } from "react";
import {
    X,
    FolderKanban,
    Sparkles,
    ListTodo,
} from "lucide-react";

const initialForm = {
    projectName: "",
    clientName: "",
    clientEmail: "",
    status: "pending",
    tasks: "",
};

export default function ProjectModal({
    isOpen,
    project,
    onClose,
    onSubmit,
}) {
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setForm(
                project
                    ? {
                        projectName: project.projectName,
                        clientName: project.clientName,
                        clientEmail: project.clientEmail,
                        status: project.status,
                        tasks: (project.tasks || []).map((task) => task.title).join("\n"),
                    }
                    : initialForm
            );
        }
    }, [isOpen, project]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tasks = form.tasks
            .split("\n")
            .map((title) => title.trim())
            .filter(Boolean)
            .map((title) => {
                const existing = project?.tasks?.find((task) => task.title === title);

                return {
                    title,
                    completed: existing?.completed || false,
                };
            });

        setSaving(true);

        try {
            await onSubmit({
                projectName: form.projectName.trim(),
                clientName: form.clientName.trim(),
                clientEmail: form.clientEmail.trim(),
                status: form.status,
                tasks,
            });
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "w-full bg-[#11141D] border border-[#303649] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#626B7F] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition";

    const labelClass =
        "block text-sm font-medium text-[#C4C8D4] mb-2";

    return (
        <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-[#171B26] border border-[#303649] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50">
                {/* Modal header */}
                <div className="flex justify-between items-start p-6 border-b border-[#252A38]">
                    <div>
                        <div className="flex items-center gap-2 text-violet-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                            <Sparkles size={13} />
                            Client onboarding
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            {project ? "Edit project" : "Create project"}
                        </h2>

                        <p className="text-sm text-[#9298AA] mt-2">
                            Add your client details and onboarding tasks.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="p-2 rounded-xl text-[#9298AA] hover:bg-[#252A38] hover:text-white transition"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#71798D] tracking-[0.15em] uppercase">
                        <FolderKanban size={15} className="text-violet-400" />
                        Project information
                    </div>

                    {[
                        ["projectName", "Project name", "Website redesign"],
                        ["clientName", "Client name", "Sarah Johnson"],
                        ["clientEmail", "Client email", "sarah@example.com"],
                    ].map(([name, label, placeholder]) => (
                        <label key={name} className="block">
                            <span className={labelClass}>{label}</span>
                            <input
                                required
                                type={name === "clientEmail" ? "email" : "text"}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className={inputClass}
                            />
                        </label>
                    ))}

                    <label className="block">
                        <span className={labelClass}>Project status</span>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option className="bg-[#171B26]" value="pending">Pending</option>
                            <option className="bg-[#171B26]" value="in-progress">In progress</option>
                            <option className="bg-[#171B26]" value="completed">Completed</option>
                        </select>
                    </label>

                    <div className="border-t border-[#252A38] pt-5">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#71798D] tracking-[0.15em] uppercase mb-4">
                            <ListTodo size={15} className="text-violet-400" />
                            Onboarding tasks
                        </div>

                        <label className="block">
                            <span className={labelClass}>Task list</span>
                            <textarea
                                name="tasks"
                                rows="5"
                                value={form.tasks}
                                onChange={handleChange}
                                placeholder={"Send welcome email\nCollect brand assets\nSchedule kickoff meeting"}
                                className={`${inputClass} resize-y leading-6`}
                            />
                            <span className="text-[11px] text-[#71798D] mt-2 block">
                                Enter one task per line.
                            </span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-[#252A38]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl border border-[#303649] text-sm font-semibold text-[#C4C8D4] hover:bg-[#252A38] transition"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={saving}
                            type="submit"
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-violet-950/30 disabled:opacity-60 transition"
                        >
                            {saving
                                ? "Saving..."
                                : project
                                    ? "Save changes"
                                    : "Create project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

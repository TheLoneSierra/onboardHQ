
import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
                        tasks: project.tasks.map((task) => task.title).join("\n"),
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
                const existing = project?.tasks.find((task) => task.title === title);
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

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs text-violet-600 font-bold tracking-widest">
                            CLIENT ONBOARDING
                        </p>
                        <h2 className="text-2xl font-bold text-slate-800 mt-2">
                            {project ? "Edit project" : "Create project"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Add your client details and onboarding tasks.
                        </p>
                    </div>

                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
                        <X size={21} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        ["projectName", "Project name", "Website redesign"],
                        ["clientName", "Client name", "Sarah Johnson"],
                        ["clientEmail", "Client email", "sarah@example.com"],
                    ].map(([name, label, placeholder]) => (
                        <label key={name} className="block">
                            <span className="block text-sm font-semibold text-slate-700 mb-2">
                                {label}
                            </span>
                            <input
                                required
                                type={name === "clientEmail" ? "email" : "text"}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                            />
                        </label>
                    ))}

                    <label className="block">
                        <span className="block text-sm font-semibold text-slate-700 mb-2">
                            Project status
                        </span>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="block text-sm font-semibold text-slate-700 mb-2">
                            Onboarding tasks
                        </span>
                        <textarea
                            name="tasks"
                            rows="4"
                            value={form.tasks}
                            onChange={handleChange}
                            placeholder={"Send welcome email\nCollect brand assets\nSchedule kickoff meeting"}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                        />
                        <span className="text-xs text-slate-400">
                            Enter one task per line.
                        </span>
                    </label>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={saving}
                            type="submit"
                            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold disabled:opacity-60"
                        >
                            {saving ? "Saving..." : project ? "Save changes" : "Create project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

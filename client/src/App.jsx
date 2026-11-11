
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  ArrowUpRight,
  Clock3,
  Activity,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import AnalyticsPanel from "./components/AnalyticsPanel";
import "./App.css";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const loadProjects = async () => {
    try {
      setError("");
      const result = await getProjects();
      setProjects(result.data || []);
    } catch (err) {
      setError(err.message || "Unable to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const stats = useMemo(
    () => ({
      total: projects.length,
      active: projects.filter((p) => p.status === "in-progress").length,
      pending: projects.filter((p) => p.status === "pending").length,
      completed: projects.filter((p) => p.status === "completed").length,
    }),
    [projects]
  );

  const filteredProjects = projects.filter((project) => {
    const term = search.toLowerCase();

    const matchesSearch =
      (project.projectName || "").toLowerCase().includes(term) ||
      (project.clientName || "").toLowerCase().includes(term) ||
      (project.clientEmail || "").toLowerCase().includes(term);

    const matchesFilter =
      filter === "all" || project.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleSave = async (payload) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, payload);
      } else {
        await createProject(payload);
      }

      setModalOpen(false);
      setEditingProject(null);
      await loadProjects();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete ${project.projectName}?`)) return;

    try {
      await deleteProject(project._id);
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTaskToggle = async (project, index) => {
    const tasks = project.tasks.map((task, i) => ({
      title: task.title,
      completed: i === index ? !task.completed : task.completed,
    }));

    const allCompleted =
      tasks.length > 0 && tasks.every((task) => task.completed);

    const status = allCompleted
      ? "completed"
      : project.status === "completed"
        ? "in-progress"
        : project.status;

    try {
      await updateProject(project._id, { tasks, status });
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (project, status) => {
    try {
      await updateProject(project._id, { status });
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="dashboard-shell flex min-h-screen text-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header onSearch={setSearch} />

        <div
          id="overview"
          className="mx-auto max-w-[1600px] space-y-8 px-4 py-7 sm:px-6 md:px-9 md:py-9"
        >
          {/* Page heading */}
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-violet-400">
                WORKSPACE / COMMAND CENTER
              </p>
              <div className="flex flex-wrap items-center gap-3"><h1 className="page-title text-3xl font-bold text-white md:text-[38px]">Systems Overview</h1><span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>Operational</span></div>
              <p className="mt-2 text-[13px] text-slate-500">A real-time view of your client onboarding operations.</p>
            </div>

            <button
              onClick={() => {
                setEditingProject(null);
                setModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-violet-300/20 bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-[12px] font-bold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <Plus size={18} />
              New project
            </button>
          </section>

          {error && (
            <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
              <button
                onClick={() => setError("")}
                className="ml-4 text-xs underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* KPI cards */}
          <StatsCards stats={stats} />

          {/* Charts */}
          <AnalyticsPanel projects={projects} />

          {/* Projects section */}
          <section id="projects" className="space-y-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-violet-400">
                  PROJECT MANAGEMENT
                </p>
                <h2 className="page-title mt-2 text-xl font-bold text-white">Project workspace</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Manage client details, delivery status and onboarding tasks.
                </p>
              </div>

              <button
                onClick={loadProjects}
                className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-violet-300"
              >
                <RefreshCw size={15} />
                Refresh data
              </button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#151329] px-4">
                <Search size={17} className="text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects or clients..."
                  className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#151329] px-4 py-3 text-sm text-slate-300 outline-none focus:border-violet-500"
              >
                <option value="all">All projects</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {loading ? (
              <div className="py-20 text-center text-sm text-slate-400">
                <RefreshCw className="mx-auto mb-3 animate-spin text-violet-400" />
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-[#151329] px-5 py-20 text-center">
                <FolderKanbanIcon />
                <h3 className="mt-4 font-semibold text-white">
                  No projects found
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Create a project or adjust your search filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onEdit={(item) => {
                      setEditingProject(item);
                      setModalOpen(true);
                    }}
                    onDelete={handleDelete}
                    onTaskToggle={handleTaskToggle}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Recently updated projects — timestamps come from project records, not an event log */}
          <section className="panel rounded-2xl p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-violet-400">
                  LATEST UPDATES
                </p>
                <h2 className="mt-2 text-lg font-bold text-white">
                  Recently updated projects
                </h2>
              </div>
              <Activity size={19} className="text-violet-400" />
            </div>

            {recentProjects.length ? (
              <div className="divide-y divide-white/[0.06]">
                {recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                        <Clock3 size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-200">
                          {project.projectName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Client: {project.clientName}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-[10px] text-slate-500 sm:block">
                        {project.updatedAt || project.createdAt
                          ? new Date(
                            project.updatedAt || project.createdAt
                          ).toLocaleDateString()
                          : "Recently"}
                      </span>
                      <ArrowUpRight size={15} className="text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-xs text-slate-500">
                No activity yet.
              </p>
            )}
          </section>

          <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.08] pt-6 text-[10px] text-slate-600 sm:flex-row">
            <span>© 2026 OnboardHQ</span>
            <span>Powered by your workspace data · Claude MCP enabled</span>
          </footer>
        </div>
      </main>

      <ProjectModal
        isOpen={modalOpen}
        project={editingProject}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}

function FolderKanbanIcon() {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
      <Activity size={22} />
    </div>
  );
}

export default App;


import { useEffect, useMemo, useState } from "react";
import { Plus, Search, RefreshCw } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const stats = useMemo(() => ({
    total: projects.length,
    active: projects.filter((p) => p.status === "in-progress").length,
    pending: projects.filter((p) => p.status === "pending").length,
    completed: projects.filter((p) => p.status === "completed").length,
  }), [projects]);

  const filteredProjects = projects.filter((project) => {
    const term = search.toLowerCase();

    const matchesSearch =
      project.projectName.toLowerCase().includes(term) ||
      project.clientName.toLowerCase().includes(term) ||
      project.clientEmail.toLowerCase().includes(term);

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

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <Header />

        <div className="max-w-7xl mx-auto px-5 md:px-10 py-10" id="overview">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-9">
            <div>
              <p className="text-xs font-bold tracking-widest text-violet-600 mb-3">
                YOUR WORKSPACE
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Good work starts here.
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Manage client onboarding projects and keep every task moving.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProject(null);
                setModalOpen(true);
              }}
              className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <Plus size={18} /> New project
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 mb-5 text-sm flex justify-between">
              {error}
              <button onClick={() => setError("")}>Dismiss</button>
            </div>
          )}

          <StatsCards stats={stats} />

          <section className="mt-12" id="projects">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Your projects</h2>
                <p className="text-sm text-slate-500 mt-1">
                  All your client onboarding work in one place.
                </p>
              </div>

              <button
                onClick={loadProjects}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600"
              >
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 flex-1">
                <Search size={18} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects or clients..."
                  className="w-full py-3 text-sm outline-none"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option value="all">All projects</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-500">
                <RefreshCw className="animate-spin mx-auto mb-3" />
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl text-center py-20 px-5">
                <h3 className="font-bold text-lg text-slate-800">
                  No projects found
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Create a project or change your search filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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

          <footer className="border-t border-slate-200 mt-14 pt-6 flex justify-between text-xs text-slate-400">
            <span>OnboardHQ</span>
            <span>Client onboarding, made simpler.</span>
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

export default App;


import {
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

export default function AnalyticsPanel({ projects }) {
    const allTasks = projects.flatMap((project) => project.tasks || []);
    const completedTasks = allTasks.filter((task) => task.completed).length;
    const totalTasks = allTasks.length;

    const completion = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    const gaugeData = [{ value: completion, fill: "#a78bfa" }];

    const chartData = projects.slice(0, 7).map((project) => ({
        name:
            project.projectName.length > 12
                ? project.projectName.slice(0, 12) + "…"
                : project.projectName,
        completed: (project.tasks || []).filter((task) => task.completed).length,
        remaining: (project.tasks || []).filter((task) => !task.completed).length,
    }));

    return (
        <section id="analytics" className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-[#151329] p-5 xl:col-span-2">
                <div className="mb-7 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-violet-400">
                            PERFORMANCE
                        </p>
                        <h2 className="mt-2 text-lg font-bold text-white">
                            Onboarding analytics
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Task completion across your projects
                        </p>
                    </div>
                    <span className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-[10px] font-semibold text-violet-300">
                        LIVE DATA
                    </span>
                </div>

                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[190px_1fr]">
                    <div className="relative mx-auto h-[190px] w-full max-w-[190px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                innerRadius="76%"
                                outerRadius="100%"
                                barSize={13}
                                data={gaugeData}
                                startAngle={90}
                                endAngle={-270}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    tick={false}
                                />
                                <RadialBar
                                    background={{ fill: "#292640" }}
                                    dataKey="value"
                                    cornerRadius={20}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                                {completion}%
                            </span>
                            <span className="mt-1 text-[10px] tracking-widest text-slate-500">
                                COMPLETED
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Overall task progress
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-slate-400">
                            {totalTasks
                                ? `${completedTasks} of ${totalTasks} onboarding tasks have been completed across all projects.`
                                : "Add onboarding tasks to your projects to start tracking completion."}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white/[0.04] p-3">
                                <p className="text-[10px] text-slate-500">Completed tasks</p>
                                <p className="mt-1 text-xl font-bold text-emerald-300">
                                    {completedTasks}
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/[0.04] p-3">
                                <p className="text-[10px] text-slate-500">Remaining tasks</p>
                                <p className="mt-1 text-xl font-bold text-violet-300">
                                    {totalTasks - completedTasks}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-t border-white/[0.07] pt-6">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">
                            Project task breakdown
                        </h3>
                        <div className="flex gap-4 text-[10px] text-slate-400">
                            <span><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-violet-400" />Done</span>
                            <span><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-cyan-400" />Remaining</span>
                        </div>
                    </div>

                    {chartData.length ? (
                        <div className="h-[210px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} barGap={5}>
                                    <CartesianGrid
                                        stroke="#ffffff"
                                        strokeOpacity={0.06}
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "#85819e", fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        tick={{ fill: "#85819e", fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={25}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#ffffff", opacity: 0.04 }}
                                        contentStyle={{
                                            background: "#211e39",
                                            border: "1px solid #393452",
                                            borderRadius: 10,
                                            color: "#fff",
                                            fontSize: 12,
                                        }}
                                    />
                                    <Bar
                                        dataKey="completed"
                                        name="Completed"
                                        stackId="tasks"
                                        fill="#a78bfa"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="remaining"
                                        name="Remaining"
                                        stackId="tasks"
                                        fill="#22d3ee"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="py-12 text-center text-xs text-slate-500">
                            Your project chart will appear here once you create projects.
                        </p>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#151329] p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-violet-400">
                    WORKSPACE HEALTH
                </p>
                <h2 className="mt-2 text-lg font-bold text-white">
                    Project overview
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Current project distribution
                </p>

                <div className="mt-8 space-y-7">
                    {[
                        {
                            label: "Completed",
                            count: projects.filter((p) => p.status === "completed").length,
                            color: "bg-emerald-400",
                        },
                        {
                            label: "In progress",
                            count: projects.filter((p) => p.status === "in-progress").length,
                            color: "bg-violet-400",
                        },
                        {
                            label: "Pending",
                            count: projects.filter((p) => p.status === "pending").length,
                            color: "bg-amber-400",
                        },
                    ].map((item) => {
                        const percentage = projects.length
                            ? Math.round((item.count / projects.length) * 100)
                            : 0;

                        return (
                            <div key={item.label}>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="text-slate-400">{item.label}</span>
                                    <span className="font-semibold text-white">
                                        {item.count} ({percentage}%)
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                                    <div
                                        className={`h-full rounded-full ${item.color} transition-all`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 rounded-xl border border-violet-500/20 bg-violet-500/[0.08] p-4">
                    <p className="text-xs font-semibold text-violet-200">
                        Workspace insight
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                        {projects.length
                            ? `${projects.length} projects are currently being managed in OnboardHQ. Keep task progress updated to maintain an accurate overview.`
                            : "Create your first project to start tracking your onboarding operations."}
                    </p>
                </div>
            </div>
        </section>
    );
}

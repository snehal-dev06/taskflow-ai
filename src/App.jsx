import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  CircleDot,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Sparkles,
  X
} from "lucide-react";
import { projects as initialProjects, tasks as initialTasks, currentUser } from "./data/mockData";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [taskFilter, setTaskFilter] = useState("All");
  const [localProjects, setLocalProjects] = useState(initialProjects);
  const [localTasks, setLocalTasks] = useState(initialTasks);
  const [modal, setModal] = useState(null);

  const completedTasks = localTasks.filter((task) => task.status === "Done").length;
  const inProgressTasks = localTasks.filter((task) => task.status === "In Progress").length;
  const completionRate = localTasks.length
    ? Math.round((completedTasks / localTasks.length) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return localTasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.project.toLowerCase().includes(query);

      const matchesFilter =
        taskFilter === "All" || task.status === taskFilter;

      return matchesSearch && matchesFilter;
    });
  }, [localTasks, searchText, taskFilter]);

  function selectPage(page) {
    setActivePage(page);
    setMobileMenu(false);

    const sectionId = page === "Dashboard" ? "dashboard" : page.toLowerCase();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  function changeTaskStatus(id) {
    const nextStatus = {
      Todo: "In Progress",
      "In Progress": "Done",
      Done: "Todo"
    };

    setLocalTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id
          ? { ...task, status: nextStatus[task.status] }
          : task
      )
    );
  }

  function addProject(project) {
    const newProject = {
      ...project,
      id: Date.now(),
      progress: 0,
      tasks: 0,
      status: "Active",
      dueDate: "Not set",
      color: "purple"
    };

    setLocalProjects((oldProjects) => [newProject, ...oldProjects]);
    setModal(null);
  }

  function addTask(task) {
    const project = localProjects.find((item) => item.id === Number(task.projectId));

    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      project: project ? project.name : "General",
      projectId: Number(task.projectId),
      assignedTo: 1,
      status: "Todo",
      priority: task.priority,
      dueDate: task.dueDate || "Not set"
    };

    setLocalTasks((oldTasks) => [newTask, ...oldTasks]);
    setLocalProjects((oldProjects) =>
      oldProjects.map((item) =>
        item.id === Number(task.projectId)
          ? { ...item, tasks: item.tasks + 1 }
          : item
      )
    );
    setModal(null);
  }

  return (
    <div className="app-shell">
      {mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)} />}

      <Sidebar
        activePage={activePage}
        onSelect={selectPage}
        mobileMenu={mobileMenu}
        onClose={() => setMobileMenu(false)}
      />

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <div className="topbar-title">
            <span>Workspace</span>
            <h1>{activePage}</h1>
          </div>

          <div className="topbar-user">
            <img src={currentUser.avatar} alt={currentUser.name} />
            <div>
              <strong>{currentUser.name}</strong>
              <span>{currentUser.role}</span>
            </div>
          </div>
        </header>

        <div className="page-content">
          <section id="dashboard" className="hero-card">
            <div>
              <div className="hero-kicker">
                <Sparkles size={14} />
                PRODUCTIVITY WORKSPACE
              </div>
              <h2>Good evening, Snehal.</h2>
              <p>Plan your work, track progress and finish your most important tasks.</p>
            </div>

            <button className="primary-button" onClick={() => setModal("project")}>
              <Plus size={17} />
              New project
            </button>
          </section>

          <section className="stats-grid" aria-label="Workspace summary">
            <StatCard icon={<FolderKanban size={19} />} label="Active projects" value={localProjects.length} note="Across your workspace" />
            <StatCard icon={<CheckCircle2 size={19} />} label="Completed tasks" value={completedTasks} note="Keep the momentum" />
            <StatCard icon={<CircleDot size={19} />} label="In progress" value={inProgressTasks} note="Currently being worked on" />
            <StatCard icon={<Sparkles size={19} />} label="Completion rate" value={`${completionRate}%`} note="Based on current tasks" />
          </section>

          <section id="projects" className="section-block">
            <SectionHeader
              eyebrow="PROJECTS"
              title="Your projects"
              actionLabel="New project"
              onAction={() => setModal("project")}
            />

            <div className="project-grid">
              {localProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section id="tasks" className="section-block">
            <SectionHeader
              eyebrow="ACTION ITEMS"
              title="Tasks"
              actionLabel="Add task"
              onAction={() => setModal("task")}
            />

            <div className="task-toolbar">
              <div className="search-box">
                <Search size={17} />
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search tasks or projects"
                  aria-label="Search tasks"
                />
              </div>

              <div className="filter-group" aria-label="Task filters">
                {["All", "Todo", "In Progress", "Done"].map((filter) => (
                  <button
                    key={filter}
                    className={taskFilter === filter ? "filter-button active" : "filter-button"}
                    onClick={() => setTaskFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="task-list">
              {filteredTasks.length === 0 ? (
                <EmptyState />
              ) : (
                filteredTasks.map((task) => (
                  <TaskRow key={task.id} task={task} onStatusChange={changeTaskStatus} />
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {modal === "project" && (
        <ProjectModal onClose={() => setModal(null)} onSubmit={addProject} />
      )}

      {modal === "task" && (
        <TaskModal
          projects={localProjects}
          onClose={() => setModal(null)}
          onSubmit={addTask}
        />
      )}
    </div>
  );
}

function Sidebar({ activePage, onSelect, mobileMenu, onClose }) {
  const links = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Projects", icon: FolderKanban },
    { name: "Tasks", icon: ClipboardList }
  ];

  return (
    <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
      <div className="brand-row">
        <div className="brand-mark"><Sparkles size={18} /></div>
        <div>
          <strong>TaskFlow</strong>
          <span>AI workspace</span>
        </div>
        <button className="close-sidebar" onClick={onClose} aria-label="Close navigation">
          <X size={19} />
        </button>
      </div>

      <div className="sidebar-label">MAIN MENU</div>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.name}
              className={activePage === link.name ? "nav-item active" : "nav-item"}
              onClick={() => onSelect(link.name)}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <img src={currentUser.avatar} alt={currentUser.name} />
          <div>
            <strong>{currentUser.name}</strong>
            <span>{currentUser.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SectionHeader({ eyebrow, title, actionLabel, onAction }) {
  return (
    <div className="section-header">
      <div>
        <span className="section-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
      </div>
      <button className="secondary-button" onClick={onAction}>
        <Plus size={16} />
        {actionLabel}
      </button>
    </div>
  );
}

function StatCard({ icon, label, value, note }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <div className={`project-icon ${project.color}`}><FolderKanban size={19} /></div>
        <span className="status-badge">{project.status}</span>
      </div>
      <h4>{project.name}</h4>
      <p>{project.description}</p>

      <div className="progress-meta">
        <span>Progress</span>
        <strong>{project.progress}%</strong>
      </div>
      <div className="progress-track">
        <div className={`progress-value ${project.color}`} style={{ width: `${project.progress}%` }} />
      </div>

      <div className="project-footer">
        <span>{project.tasks} tasks</span>
        <span>{project.dueDate}</span>
      </div>
    </article>
  );
}

function TaskRow({ task, onStatusChange }) {
  const isDone = task.status === "Done";

  return (
    <article className="task-row">
      <button
        className={isDone ? "task-status-button done" : "task-status-button"}
        onClick={() => onStatusChange(task.id)}
        aria-label={`Change status for ${task.title}`}
        title="Click to change status"
      >
        {isDone ? <Check size={14} /> : <span />}
      </button>

      <div className="task-info">
        <strong className={isDone ? "completed-task" : ""}>{task.title}</strong>
        <span>{task.project}</span>
      </div>

      <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
      <span className={`task-status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
      <span className="task-due">{task.dueDate}</span>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon"><ClipboardList size={22} /></div>
      <h4>No tasks found</h4>
      <p>Try another search or change the status filter.</p>
    </div>
  );
}

function ModalShell({ title, subtitle, onClose, children }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="section-eyebrow">TASKFLOW</span>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ProjectModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  }

  return (
    <ModalShell title="Create a project" subtitle="Start a new workspace item." onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>Project name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. College Portfolio" autoFocus /></label>
        <label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this project about?" rows="4" /></label>
        <div className="modal-actions"><button type="button" className="ghost-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Create project</button></div>
      </form>
    </ModalShell>
  );
}

function TaskModal({ projects, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !projectId) return;
    onSubmit({ title: title.trim(), description: description.trim(), priority, projectId, dueDate });
  }

  return (
    <ModalShell title="Add a task" subtitle="Create an action item for your workspace." onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>Task title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Finish API testing" autoFocus /></label>
        <label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What needs to be done?" rows="3" /></label>
        <div className="form-grid">
          <label>Project<select value={projectId} onChange={(event) => setProjectId(event.target.value)}>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
          <label>Priority<select value={priority} onChange={(event) => setPriority(event.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
        </div>
        <label>Due date<input type="text" value={dueDate} onChange={(event) => setDueDate(event.target.value)} placeholder="e.g. Sep 15" /></label>
        <div className="modal-actions"><button type="button" className="ghost-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Add task</button></div>
      </form>
    </ModalShell>
  );
}

export default App;

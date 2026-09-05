export const currentUser = {
  name: "Snehal Londhe",
  role: "Developer",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6c3Ofmv2mvXXusoGi-uqeH5IKZMvPR6hEPN2R_Tot8g&s=10"
};

export const projects = [
  {
    id: 1,
    name: "TaskFlow AI",
    description: "AI powered project and task management platform.",
    progress: 72,
    tasks: 18,
    status: "Active",
    dueDate: "Sep 12",
    color: "purple"
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio and project showcase website.",
    progress: 58,
    tasks: 11,
    status: "Active",
    dueDate: "Sep 05",
    color: "blue"
  },
  {
    id: 3,
    name: "API Practice",
    description: "REST API practice project for backend development.",
    progress: 86,
    tasks: 14,
    status: "Review",
    dueDate: "Aug 31",
    color: "green"
  }
];

export const tasks = [
  {
    id: 1,
    title: "Create dashboard wireframe",
    project: "TaskFlow AI",
    status: "Done",
    priority: "High",
    dueDate: "Today"
  },
  {
    id: 2,
    title: "Build project card component",
    project: "TaskFlow AI",
    status: "In Progress",
    priority: "High",
    dueDate: "Today"
  },
  {
    id: 3,
    title: "Connect task filtering",
    project: "TaskFlow AI",
    status: "Todo",
    priority: "Medium",
    dueDate: "Tomorrow"
  },
  {
    id: 4,
    title: "Update portfolio projects",
    project: "Portfolio Website",
    status: "In Progress",
    priority: "Medium",
    dueDate: "Sep 01"
  },
  {
    id: 5,
    title: "Test project API endpoints",
    project: "API Practice",
    status: "Done",
    priority: "Low",
    dueDate: "Aug 30"
  }
];

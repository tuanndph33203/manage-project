import { Edit, Trash2, List, Grid3X3 } from "lucide-react";

const ProjectsPage = () => {
  const projects = [
    { name: "E-commerce Platform", owner: "Sarah Wilson", avatar:"https://i.pravatar.cc/50?u=1", created:"Nov 05, 2025", status:"Active" },
    { name: "Mobile Banking App", owner: "John Davis", avatar:"https://i.pravatar.cc/50?u=2", created:"Nov 03, 2025", status:"Pending" },
    { name: "CRM Dashboard", owner: "Emily Chen", avatar:"https://i.pravatar.cc/50?u=3", created:"Nov 01, 2025", status:"Active" },
    { name: "Learning Management", owner: "Michael Brown", avatar:"https://i.pravatar.cc/50?u=4", created:"Oct 28, 2025", status:"Completed" },
    { name: "Healthcare Portal", owner: "Robert Garcia", avatar:"https://i.pravatar.cc/50?u=5", created:"Oct 18, 2025", status:"Completed" },
    { name: "Project Management", owner: "Anna Thompson", avatar:"https://i.pravatar.cc/50?u=6", created:"Oct 20, 2025", status:"Active" },
    { name: "Analytics Platform", owner: "Lisa Rodriguez", avatar:"https://i.pravatar.cc/50?u=7", created:"Oct 25, 2025", status:"Active" },
    { name: "Social Media Tool", owner: "David Kim", avatar:"https://i.pravatar.cc/50?u=8", created:"Oct 22, 2025", status:"Pending" },
  ];

  const getStatusColor = (status) =>
    status === "Active" ? "text-green-600"
    : status === "Pending" ? "text-yellow-500"
    : "text-red-500";

  return (
    <div className=" bg-gray-50 p-6">

      {/* Top Action Bar */}
      <div className="flex justify-end items-center gap-3 mb-6">

        {/* View Toggle */}
        <div className="flex border rounded-lg bg-white overflow-hidden">
          <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 font-medium">
            <Grid3X3 size={16}/> Card View
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:bg-gray-100">
            <List size={16}/> List View
          </button>
        </div>

        {/* Buttons */}
        <button className="flex items-center gap-1 px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          + New Project
        </button>
        <button className="flex items-center gap-1 px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          + Join Project
        </button>
      </div>

      {/* Project List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <div key={i} className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{p.name}</h3>
              <span className={`text-sm font-medium ${getStatusColor(p.status)}`}>
                ● {p.status}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <img src={p.avatar} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-medium">{p.owner}</p>
                <p className="text-gray-500 text-xs">Created {p.created}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 justify-end text-gray-500">
              <button className="hover:text-indigo-600"><Edit size={17} /></button>
              <button className="hover:text-red-600"><Trash2 size={17} /></button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div>
          Show 1 - 10 of 245 projects
        </div>
        <div className="flex justify-center items-center gap-3 mt-10">
        <button className="px-2 text-gray-500 hover:text-black">&lt;</button>
        <button className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-md">1</button>
        <button className="px-2 text-gray-700">2</button>
        <button className="px-2 text-gray-700">3</button>
        <span className="px-2">...</span>
        <button className="px-2 text-gray-700">25</button>
        <button className="px-2 text-gray-500 hover:text-black">&gt;</button>
      </div>
      </div>

    </div>
  );
};

export default ProjectsPage;

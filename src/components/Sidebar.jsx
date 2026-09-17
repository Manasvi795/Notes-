import AddIcon from "@mui/icons-material/Add";

import Module from "./Module";

function Sidebar({
  modules,
  handleAddModule,
  handleSelectModule,
  onDeleteModule,
  onAddSubmodule,
  onSelectSubmodule,
  onDeleteSubmodule,
}) {
  return (
    <aside className="w-full md:w-72 min-h-auto md:min-h-screen bg-[#EEF8FF] border-b border-[#DDEFF9] p-4 md:p-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      <div className="mb-5 md:mb-8 px-2 py-2 md:py-3 flex flex-col gap-2 md:gap-3">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800">
          My Notes
        </h1>
        <p className="text-sm text-slate-400">Organize your thoughts</p>
      </div>
      <button
        onClick={handleAddModule}
        className="w-full flex items-center justify-center gap-1 py-2.5 rounded-xl bg-[#DCEEFF] text-[#2878D4] font-medium hover:bg-[#D2E9FC] transition-all duration-100"
      >
        <AddIcon />
        Add Module
      </button>
      <div className="mt-6 space-y-2">
        {modules.map((module) => (
          <Module
            key={module.id}
            module={module}
            onSelect={handleSelectModule}
            onDelete={onDeleteModule}
            onAddSubmodule={onAddSubmodule}
            onSelectSubmodule={onSelectSubmodule}
            onDeleteSubmodule={onDeleteSubmodule}
          />
        ))}
        {modules.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-sm text-slate-400">No modules yet</p>
            <p className="text-xs text-slate-300 mt-1">
              Add a module to start taking notes
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
export default Sidebar;

import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Submodule from "./Submodule.jsx";

function Module({
  module,
  onSelect,
  onDelete,
  onAddSubmodule,
  onSelectSubmodule,
  onDeleteSubmodule,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(module.id);
  };
  const handleAddSubmodule = (e) => {
    e.stopPropagation();
    onAddSubmodule(module.id);
    setIsOpen(true);
  };

  return (
    <div className="mb-4">
      <div
        onClick={() => {
          onSelect(module);
          setIsOpen(!isOpen);
        }}
        className="group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-white transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ExpandMoreIcon
            className={`text-[#2878D4] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <div className="w-2 h-8 rounded-full bg-[#8CCBFA]" />
          <p className="text-sm font-medium text-slate-700">{module.title}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={handleAddSubmodule}
            className="p-1 rounded-md text-slate-400 hover:text-blue-500 hover:bg-blue-50"
          >
            <AddIcon fontSize="small" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>
      {isOpen && module.submodules.length > 0 && (
        <div className="relative ml-5 mt-1 space-y-1 pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#CFE5F4]" />
          {module.submodules.map((submodule) => (
            <Submodule
              key={submodule.id}
              submodule={submodule}
              moduleId={module.id}
              onSelect={onSelectSubmodule}
              onDelete={onDeleteSubmodule}
            />
          ))}
        </div>
      )}
      {isOpen && module.submodules.length === 0 && (
        <div className="ml-10 mt-2 px-3 py-2">
          <p className="text-xs text-slate-400">No submodules yet</p>
        </div>
      )}
    </div>
  );
}

export default Module;

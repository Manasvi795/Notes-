import DeleteIcon from "@mui/icons-material/Delete";

function Submodule({ submodule, onSelect, moduleId, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(moduleId, submodule.id);
  };
  return (
    <div
      onClick={() => onSelect(submodule, moduleId)}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-white transition-all"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-1.5 h-1.5 rounded-full bg-[#9FD5F7] group-hover:bg-[#2878D4] transition" />
        <p className="text-sm text-slate-500 group-hover:text-[#2878D4] transition truncate">
          {submodule.title}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="p-1 rounded-md text-slate-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 transition"
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  );
}

export default Submodule;

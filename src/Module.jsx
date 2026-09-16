import DeleteIcon from "@mui/icons-material/Delete";

function Module({ module, onSelect, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(module.id);
  };
  return (
    <div
      onClick={() => onSelect(module)}
      className="px-4 py-3 rounded-xl cursor-pointer hover:bg-white transition"
    >
      <p className="text-sm font-medium text-slate-700">{module.title}</p>
      <button
        onClick={handleDelete}
        className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  );
}

export default Module;

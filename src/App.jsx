import { useState } from "react";

import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

function App() {
  const [modules, setModules] = useState(
    JSON.parse(localStorage.getItem("notes")) || [],
  );
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddModule = () => {
    const newModule = {
      id: modules.length,
      title: "",
      content: "",
      submodules: [],
    };

    setModules((prevModules) => [...prevModules, newModule]);
    setSelectedNote({
      type: "module",
      moduleId: newModule.id,
      note: newModule,
    });
  };
  const handleSelectModule = (module) => {
    setSelectedNote({
      type: "module",
      moduleId: module.id,
      note: module,
    });
  };

  const handleAddSubmodule = (moduleId) => {
    const parentModule = modules.find((module) => module.id === moduleId);
    if (!parentModule) return;
    const newSubmodule = {
      id: parentModule.submodules.length,
      title: "",
      content: "",
    };
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              submodules: [...module.submodules, newSubmodule],
            }
          : module,
      ),
    );
    setSelectedNote({
      type: "submodule",
      moduleId: moduleId,
      note: newSubmodule,
    });
  };

  const handleSelectSubmodule = (submodule, moduleId) => {
    setSelectedNote({
      type: "submodule",
      moduleId: moduleId,
      note: submodule,
    });
  };

  const handleSave = (title, content) => {
    if (!selectedNote) return;
    let newModules;
    if (selectedNote.type === "module") {
      newModules = modules.map((module) =>
        module.id === selectedNote.moduleId
          ? {
              ...module,
              title,
              content,
            }
          : module,
      );
    }
    if (selectedNote.type === "submodule") {
      newModules = modules.map((module) =>
        module.id === selectedNote.moduleId
          ? {
              ...module,
              submodules: module.submodules.map((submodule) =>
                submodule.id === selectedNote.note.id
                  ? {
                      ...submodule,
                      title,
                      content,
                    }
                  : submodule,
              ),
            }
          : module,
      );
    }
    setModules(newModules);
    localStorage.setItem("notes", JSON.stringify(newModules));
    setSelectedNote((prev) => ({
      ...prev,
      note: {
        ...prev.note,
        title,
        content,
      },
    }));
  };
  const handleDeleteModule = (id) => {
    const newModules = modules.filter((module) => module.id !== id);
    setModules(newModules);
    localStorage.setItem("notes", JSON.stringify(newModules));
    if (selectedNote && selectedNote.moduleId === id) {
      setSelectedNote(null);
    }
  };
  const handleDeleteSubmodule = (moduleId, submoduleId) => {
    const newModules = modules.map((module) =>
      module.id === moduleId
        ? {
            ...module,
            submodules: module.submodules.filter(
              (submodule) => submodule.id !== submoduleId,
            ),
          }
        : module,
    );
    setModules(newModules);
    localStorage.setItem("notes", JSON.stringify(newModules));
    if (
      selectedNote &&
      selectedNote.type === "submodule" &&
      selectedNote.moduleId === moduleId &&
      selectedNote.note.id === submoduleId
    ) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row not-even:min-h-screen">
        <Sidebar
          modules={modules}
          handleAddModule={handleAddModule}
          handleSelectModule={handleSelectModule}
          onDeleteModule={handleDeleteModule}
          onAddSubmodule={handleAddSubmodule}
          onSelectSubmodule={handleSelectSubmodule}
          onDeleteSubmodule={handleDeleteSubmodule}
        />
        <div className="flex-1 min-w-0 bg-white">
          <Editor selectedNote={selectedNote} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default App;

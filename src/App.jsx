import { useState } from "react";

import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

function App() {
  const [modules, setModules] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddModule = () => {
    const newModule = {
      id: modules.length,
      title: "New Module",
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
      title: "New Submodule",
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

    if (selectedNote.type === "module") {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedNote.moduleId
            ? {
                ...module,
                title,
                content,
              }
            : module,
        ),
      );
      setSelectedNote((prev) => ({
        ...prev,
        note: {
          ...prev.note,
          title,
          content,
        },
      }));
    }
    if (selectedNote.type === "submodule") {
      setModules((prevModules) =>
        prevModules.map((module) =>
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
        ),
      );
      setSelectedNote((prev) => ({
        ...prev,
        note: {
          ...prev.note,
          title,
          content,
        },
      }));
    }
  };
  const handleDeleteModule = (id) => {
    setModules((prevModules) =>
      prevModules.filter((module) => module.id !== id),
    );
    if (selectedNote && selectedNote.moduleId === id) {
      setSelectedNote(null);
    }
  };
  const handleDeleteSubmodule = (moduleId, submoduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              submodules: module.submodules.filter(
                (submodule) => submodule.id !== submoduleId,
              ),
            }
          : module,
      ),
    );

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
      <div className="flex min-h-screen">
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

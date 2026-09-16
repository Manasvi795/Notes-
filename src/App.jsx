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
    setSelectedNote(newModule);
  };
  const handleSelectModule = (module) => {
    setSelectedNote(module);
  };

  const handleSave = (title, content) => {
    const updatedModules = modules.map((module) =>
      module.id === selectedNote.id
        ? {
            ...module,
            title: title,
            content: content,
          }
        : module,
    );
    setModules(updatedModules);
    setSelectedNote({
      ...selectedNote,
      title: title,
      content: content,
    });
  };
  const handleDeleteModule = (id) => {
    setModules((prevModules) =>
      prevModules.filter((module) => module.id !== id),
    );
    if (selectedNote?.id === id) {
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
        />
        <div className="flex-1 min-w-0 bg-white">
          <Editor selectedNote={selectedNote} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default App;

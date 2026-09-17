import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ selectedNote, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.note.title);
      setContent(selectedNote.note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  if (!selectedNote) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-slate-400">Select a module to start writing</p>
      </div>
    );
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!content || content === "<p><br></p>") {
      alert("Please enter some content");
      return;
    }
    onSave(title, content);
  };

  return (
    <div className="w-full min-h-screen bg-white p-3 sm:p-5 md:p-8 lg:p-10">
      <div className="m-4 sm:m-6 md:m-8 rounded-2xl border border-[#E6F0F7] overflow-hidden bg-white shadow-[0_4px_20px_rgba(59,130,246,0.04)]">
        <div className="px-5 sm:px-7 md:px-10 pt-6 sm:pt-7 md:pt-8 pb-5">
          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-none outline-none bg-transparent text-lg sm:text-xl md:text-2xl  text-gray-800 placeholder-gray-300"
          />
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Start writing your note..."
          className="text-lg"
        />
      </div>
      <div className="flex justify-end p-3 sm:p-4 mt-2">
        <button
          onClick={handleSave}
          className="w-24 h-7 flex items-center justify-center rounded-lg bg-[#2878D4] text-white text-sm font-medium shadow-sm hover:bg-[#2169BE] hover:shadow-md active:scale-95 transition-all "
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;

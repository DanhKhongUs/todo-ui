import { useState, useRef, KeyboardEvent, ChangeEvent, JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function TodoApp(): JSX.Element {
  const [todo, setTodo] = useState<string>("");
  const [todoValue, setTodoValue] = useState<string[]>(() => {
    try {
      const storageTodo = localStorage.getItem("todos");
      return storageTodo ? JSON.parse(storageTodo) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage", error);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (): void => {
    if (!todo.trim()) {
      toast.warn("Please enter a todo!");
      return;
    }

    setTodoValue((prev) => {
      const newList = [...prev, todo];
      localStorage.setItem("todos", JSON.stringify(newList));
      return newList;
    });

    toast.success("Todo added!");

    if (inputRef.current) inputRef.current.focus();
    setTodo("");
  };

  const handleDelete = (index: number): void => {
    setTodoValue((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    });

    toast.info("Todo deleted!");
  };

  const handleEdit = (index: number): void => {
    setEditIndex(index);
    setEditText(todoValue[index]);
  };

  const handleSave = (): void => {
    if (editIndex === null || !editText.trim()) {
      toast.error("Cannot save empty todo!");
      return;
    }

    setTodoValue((prev) => {
      const updated = [...prev];
      updated[editIndex] = editText.trim();
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    });

    toast.success("Todo updated!");
    setEditIndex(null);
    setEditText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4 font-mono">
      <div className="bg-[#1a1a2e] p-6 rounded-xl shadow-2xl w-full max-w-md border border-[#2c2c3e]">
        <h1 className="text-3xl font-bold text-center text-[#00f2fe] mb-6">
          🚀TODO APP
        </h1>

        <div className="flex items-center mb-6 gap-3">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a Todo..."
            value={todo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTodo(e.target.value)
            }
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 p-2 border border-[#00f2fe] bg-[#10101a] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
          />

          <button
            onClick={handleSubmit}
            className="min-w-[64px] bg-[#00f2fe] text-[#0f0f1a] font-bold py-1.5 px-4 rounded hover:bg-[#00c2c1] transition"
          >
            Add
          </button>
        </div>

        <div className="mt-4 text-base font-medium text-[#ccc]">
          {todoValue.length > 0 && (
            <h2 className="text-lg text-[#00f2fe] mb-3">Your Todos:</h2>
          )}

          <ul className="space-y-3 max-h-100 overflow-y-auto">
            {todoValue.map((todoItem, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-3 bg-[#222237] text-white rounded-lg shadow-md"
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditText(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-[#111122] text-white border border-[#00f2fe] p-2 rounded"
                  />
                ) : (
                  <span className="flex-1">{todoItem}</span>
                )}

                <div className="ml-3 flex gap-3">
                  {editIndex === index ? (
                    <button
                      className="text-[#00f2fe] hover:text-[#00d0d0]"
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon={faCheck} size="xl" />
                    </button>
                  ) : (
                    <button
                      className="text-[#00f2fe] hover:text-[#00d0d0]"
                      onClick={() => handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-300"
                  >
                    <FontAwesomeIcon icon={faTrashCan} size="xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;

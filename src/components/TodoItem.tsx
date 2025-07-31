import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../services/todoService";

interface Todo {
  _id: string;
  title: string;
  completed?: boolean;
}

export default function TodoItem() {
  const [todo, setTodo] = useState<string>("");
  const [todoValue, setTodoValue] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getAllTodos();
        setTodoValue(res.data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    if (!todo.trim()) return;
    try {
      const res = await createTodo({ title: todo.trim() });
      setTodoValue((prev) => [res.data, ...prev]);
      setTodo("");
    } catch (error) {
      console.error("Create todo failed", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodoValue((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = async (id: number) => {
    setEditIndex(id);
    setEditText(todoValue[id].title);
  };

  const handleSave = async () => {
    if (editIndex === null) return;
    const todoToUpdate = todoValue[editIndex];
    try {
      const res = await updateTodo({
        id: todoToUpdate._id,
        title: editText.trim(),
      });
      const updated = [...todoValue];
      updated[editIndex] = res.data;
      setTodoValue(updated);
      setEditIndex(null);
      setEditText("");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSave();
  };

  return (
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
          className="min-w-[64px] bg-[#00f2fe] text-[#0f0f1a] font-bold py-1.5 px-4 rounded hover:bg-[#00c2c1] transition cursor-pointer"
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
              key={todoItem._id}
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
                <span className="flex-1">{todoItem.title}</span>
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
                    className="text-[#00f2fe] hover:text-[#00d0d0] cursor-pointer"
                    onClick={() => handleEdit(index)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(todoItem._id)}
                  className="text-red-500 hover:text-red-300 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrashCan} size="xl" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

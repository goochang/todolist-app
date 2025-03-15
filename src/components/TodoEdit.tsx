import React, { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoEditProps {
  todo: Todo;
  onEdit: (id: number, newTitle: string) => void;
  onClose: () => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, onEdit, onClose }) => {
  const [editText, setEditText] = useState(todo.title || "");

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText);
    onClose();
  };

  return (
    <div className="flex flex-col items-center gap-2 grow-1">
        <div className="w-full">
            <input
                className="w-full flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus />
        </div>
        <div className="w-full flex gap-2">
            <button onClick={handleSave}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    </div>
  );
};

export default TodoEdit;
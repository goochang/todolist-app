import React from "react";

interface TodoInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-2 p-2 border border-blue-500 rounded-lg shadow-sm">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요"
        className="flex-1 p-2 rounded-md outline-none focus:outline-none"
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
      >
        추가
      </button>
    </div>
  );
};

export default TodoInput;

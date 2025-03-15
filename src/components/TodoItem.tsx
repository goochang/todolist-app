import { Todo } from '@/types/todo'
import React from 'react'

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, onToggle, onDelete}) => {
  return (
    <div>
        <span>todo</span>
        <input type="checkbox" checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)} />
        <span>{todo.title}</span>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
    </div>
  )
}

export default TodoItem
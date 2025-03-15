import { Todo } from '@/types/todo'
import React from 'react'
import TodoEdit from './TodoEdit';

interface TodoItemProps {
    todo: Todo;
    editId: number;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onEditToggle: (id: number) => void;
    onEdit: (id: number, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, editId, onToggle, onDelete, onEditToggle, onEdit}) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 shadow-lg shadow-gray-300 rounded-lg p-4 hover:bg-gray-50 w-full gap-2">
        <input type="checkbox" checked={todo.completed} className='cursor-pointer'
        onChange={() => onToggle(todo.id, todo.completed)} />
        {
            editId === todo.id ? 
            <TodoEdit todo={todo} onClose={() => onEditToggle(0) } onEdit={onEdit} /> : (
                <span className="flex-1 text-sm text-gray-900 grow-1">{todo.title}</span>
            )
        }
        <button 
          onClick={() => onEditToggle(todo.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          삭제
        </button>
    </div>
  )
}

export default TodoItem
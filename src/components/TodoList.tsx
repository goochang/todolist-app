import { Todo } from '@/types/todo'
import React from 'react'
import TodoItem from './TodoItem'

interface TodoListProps {
    todos: Todo[];
    editId: number;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onEditToggle: (id: number) => void;
    onEdit: (id: number, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({todos, editId, onToggle, onDelete, onEditToggle, onEdit}) => {
  return (
    <div className="space-y-4 w-full">
        {todos && todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} editId={editId}
            onToggle={onToggle} onDelete={onDelete} onEditToggle={onEditToggle} onEdit={onEdit} />
        ))}
    </div>
  )
}

export default TodoList
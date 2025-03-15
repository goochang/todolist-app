import { Todo } from '@/types/todo'
import React from 'react'
import TodoItem from './TodoItem'

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({todos, onToggle, onDelete}) => {
  return (
    <ul className="space-y-2">
        {todos && todos.map(todo => (
            <TodoItem key={todo.id} todo={todo}  onToggle={onToggle} onDelete={onDelete} />
        ))}
    </ul>
  )
}

export default TodoList
import { Todo } from '@/types/todo'
import React from 'react'

interface TodoItemProps {
    todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({todo}) => {
  return (
    <div>
        <span>todo</span>
        <input type="checkbox" checked={todo.completed} />
        <span>{todo.title}</span>
    </div>
  )
}

export default TodoItem
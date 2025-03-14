import { Todo } from '@/types/todo'
import React from 'react'
import TodoItem from './TodoItem'

interface TodoListProps {
    todos: Todo[]
}

const TodoList: React.FC<TodoListProps> = ({todos}) => {
  return (
    <ul>
        {todos && todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
    </ul>
  )
}

export default TodoList
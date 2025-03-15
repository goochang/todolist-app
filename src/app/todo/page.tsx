"use client";

import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const fetchTodos = async () => {
    const res = await fetch("http://localhost:3000/todos");
    if (!res.ok) {
        throw new Error("Failed to fetch todos");
    }
    return res.json();
}

export default function TodoPage() {
    const queryClient = useQueryClient();
    const { data: todos, isLoading, error } = useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addTodoMutation = useMutation({
        mutationFn: async (newTodo: { title: string; completed: boolean }) => {
          const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
          });
          if (!response.ok) throw new Error("할 일 추가 실패");
          return response.json();
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] }); // ✅ 리스트 다시 불러오기
        },
    });

    const toggleMutation = useMutation({
        mutationFn: async (todo: { id: number; completed: boolean }) => {
          const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !todo.completed }),
          });
          if (!response.ok) throw new Error("완료 상태 변경 실패");
          return response.json();
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] }); // ✅ 리스트 다시 불러오기
        },
    });
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
          const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("할일 삭제 실패");
          return response.json();
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] }); // ✅ 리스트 다시 불러오기
        },
    });
    
    // 입력값 추가
    const handleAddTodo = () => {
        if (inputValue.trim() === "") return;
        addTodoMutation.mutate({ title: inputValue, completed: false });
        setInputValue(""); // 입력창 초기화
    };

    const handleToogleTodo = (id: number, completed: boolean) => {
        toggleMutation.mutate({id, completed});
    };

    const handleDeleteTodo = (id: number) => {
        deleteMutation.mutate(id);
    };

    if(isLoading){
        return <div>Loading...</div>
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>My Todo List</h1>
            <TodoInput value={inputValue} onChange={handleInputChange} onSubmit={handleAddTodo} />
            <TodoList todos={todos || []} onToggle={handleToogleTodo} onDelete={handleDeleteTodo} />
        </div>
    );
}
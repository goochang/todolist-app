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

export default function Home() {
    const queryClient = useQueryClient();
    const { data: todos, isLoading, error } = useQuery<Todo[], Error>({
      queryKey: ["todos"],
      queryFn: fetchTodos,
    });
    const [inputValue, setInputValue] = useState("");
    const [editId, setEditId] = useState(0);
    const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

    const filteredTodos = todos?.filter(todo => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true; // "all"일 경우 전체 반환
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
    
    const addTodoMutation = useMutation({
      mutationFn: async (newTodo: { id: string, title: string; completed: boolean }) => {
        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        if (!response.ok) throw new Error("할 일 추가 실패");
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
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
        queryClient.invalidateQueries({ queryKey: ["todos"] });
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
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });
    const editTodoMutation = useMutation({
      mutationFn: async (todo: { id: number; title: string }) => {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...todo, title: todo.title }),
        });
        if (!response.ok) throw new Error("할일 변경 실패");
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });
    // 입력값 추가
    const handleAddTodo = () => {
      if (inputValue.trim() === "") return;
      const newId = todos?.length ? (Math.max(...todos.map((todo) => Number(todo.id))) + 1).toString() : "1";
      addTodoMutation.mutate({ id:newId, title: inputValue, completed: false });
      setInputValue(""); // 입력창 초기화
    };

    const handleToogleTodo = (id: number, completed: boolean) => {
      toggleMutation.mutate({id, completed});
    };

    const handleDeleteTodo = (id: number) => {
      deleteMutation.mutate(id);
    };

    const handleEditToggle = (id: number) => {
      setEditId(id);
    };
    const handleEdit = (id: number, title:string) => {
      editTodoMutation.mutate({id, title});
    };

    if(isLoading){
      return <div>Loading...</div>
    }

    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-4xl w-full mx-auto p-4 my-16">
        <h1 className="text-2xl font-semibold text-center mb-6">할 일 목록</h1>
        <div className="flex gap-2 my-4">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded cursor-pointer ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            전체
          </button>
          <button onClick={() => setFilter("completed")} className={`px-4 py-2 rounded cursor-pointer ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}>
            완료
          </button>
          <button onClick={() => setFilter("incomplete")} className={`px-4 py-2 rounded cursor-pointer ${filter === "incomplete" ? "bg-red-500 text-white" : "bg-gray-200"}`}>
            미완료
          </button>
        </div>
        <div className="mb-6 w-full">
          <TodoInput 
            value={inputValue} 
            onChange={handleInputChange} 
            onSubmit={handleAddTodo} 
          />
        </div>
        <div className="w-full">
            <TodoList todos={filteredTodos || []} editId={editId} 
            onToggle={handleToogleTodo} onDelete={handleDeleteTodo} onEditToggle={handleEditToggle} onEdit={handleEdit} />
        </div>
      </div>
    );
}
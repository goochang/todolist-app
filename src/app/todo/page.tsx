"use client";

import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchTodos = async () => {
    const res = await fetch("http://localhost:4000/todos");
    if (!res.ok) {
        throw new Error("Failed to fetch todos");
    }
    return res.json();
}

export default function TodoPage() {
    const { data: todos, isLoading, error } = useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    if(isLoading){
        return <div>Loading...</div>
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>My Todo List</h1>
            <TodoList todos={todos || []} />
        </div>
    );
}
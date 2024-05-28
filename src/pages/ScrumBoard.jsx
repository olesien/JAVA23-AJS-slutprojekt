import React from "react";
import { useTasks } from "../hooks/firebase/useTasks";
import AddToDo from "../components/AddToDo";
import Board from "../components/Board";
import { useAuth } from "../hooks/firebase/useAuth";

export default function ScrumBoard({ logout }) {
    const { tasks, addTask } = useTasks();
    const { user } = useAuth();
    return (
        <>
            <header>
                <h1>Scrum Board</h1>
                <button onClick={() => logout()}>Logout</button>
            </header>
            <div>
                {user && (
                    <p className="login-text">Logged as: {user?.displayName}</p>
                )}
                <AddToDo addTask={addTask} />
                {/* The main board where you see the tasks */}
                <Board tasks={tasks} />
            </div>
        </>
    );
}

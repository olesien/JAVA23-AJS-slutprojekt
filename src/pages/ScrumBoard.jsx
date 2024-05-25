import React from "react";
import { useTasks } from "../hooks/firebase/useTasks";
import AddToDo from "../components/AddToDo";
import Board from "../components/Board";

export default function ScrumBoard({ logout }) {
    const { tasks, addTask } = useTasks();
    return (
        <>
            <header>
                <h1>Scrum Board</h1>
                <button onClick={() => logout()}>Logout</button>
            </header>
            <div>
                <AddToDo addTask={addTask} />
                <Board tasks={tasks} />
            </div>
        </>
    );
}

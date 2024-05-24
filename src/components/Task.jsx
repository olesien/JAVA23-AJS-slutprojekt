import React from "react";
import { useTasks } from "../hooks/firebase/useTasks";

export default function Task({ task }) {
    const { removeTask } = useTasks();
    return (
        <li className={"task " + task?.type ?? "Unknown"}>
            <div className="task-content">{task?.content}</div>
            <div className="task-close">
                <p onClick={() => removeTask(task.key)}>X</p>
            </div>
        </li>
    );
}

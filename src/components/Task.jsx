import React from "react";
import { useTasks } from "../hooks/firebase/useTasks";
import { useDrag } from "react-dnd";

export default function Task({ task, preview }) {
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: "task",
            item: { task },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
            }),
        }),
        []
    );
    const { removeTask } = useTasks();
    return (
        <li
            className={`task ${task?.type ?? "Unknown"} ${
                preview ? "preview" : ""
            }`}
            ref={dragRef}
        >
            <div className="task-content">{task?.content}</div>
            <div className="task-close">
                <p onClick={() => removeTask(task.key)}>X</p>
            </div>
        </li>
    );
}

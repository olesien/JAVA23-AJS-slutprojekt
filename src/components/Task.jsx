import React from "react";
import { useTasks } from "../hooks/firebase/useTasks";
import { useDrag } from "react-dnd";

export default function Task({ task, preview }) {
    const { removeTask } = useTasks();
    const remove = (key) => {
        const yes = confirm("Are you sure you would like to remove the task?");
        if (!yes) return;
        removeTask(key);
    };

    //Ref component used to know what components are draggable, and keep track of their states
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
    return (
        <li
            className={`task ${task?.type ?? "Unknown"} ${
                preview ? "preview" : ""
            }`}
            ref={dragRef}
        >
            <div className="task-content">
                {task?.content} {!!task?.assignee && `(${task.assignee})`}
            </div>
            <div className="task-close">
                <p onClick={() => remove(task.key)}>X</p>
            </div>
        </li>
    );
}

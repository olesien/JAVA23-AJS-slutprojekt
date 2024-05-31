import React from "react";
import { useTasks } from "../hooks/firebase/useTasks";
import { useDrag } from "react-dnd";

export default function Task({ task, preview, from }) {
    const { removeTask } = useTasks();
    console.log(from);
    const remove = (key) => {
        const yes = confirm("Are you sure you would like to remove the task?");
        if (!yes) return;
        removeTask(key);
    };
    console.log(task);
    //Ref component used to know what components are draggable, and keep track of their states
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: "task",
            item: { task, from },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
            }),
        }),
        [task, from]
    );
    console.log(task?.type);

    //Preview, so that it does not have the REF
    if (preview) {
        return (
            <li className={`task ${task?.type ?? "Unknown"} preview`}>
                <div className="task-content">
                    {task?.content} {!!task?.assignee && `(${task.assignee})`}
                </div>
                {task?.column === "done" && (
                    <div className="task-close">
                        <p onClick={() => remove(task.key)}>X</p>
                    </div>
                )}
            </li>
        );
    }
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
            {task?.column === "done" && (
                <div className="task-close">
                    <p onClick={() => remove(task.key)}>X</p>
                </div>
            )}
        </li>
    );
}

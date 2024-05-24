import React, { useMemo } from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useTasks } from "../hooks/firebase/useTasks";

export default function BoardColumn({ id, title, tasks }) {
    const { editTask } = useTasks();
    const filteredTasks = useMemo(() => {
        return Object.entries(tasks)
            .map(([key, data]) => ({ key, ...data }))
            .filter((data) => (data?.column ?? "todo") === id);
    }, [tasks]);
    const [{ isOver, hoverItem }, dropRef] = useDrop({
        accept: "task",
        drop: (item) => {
            console.log(item);
            const task = item.task;
            task.column = id;
            editTask(task);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            hoverItem: monitor.getItem(),
        }),
    });
    return (
        <div className="column" id={id} ref={dropRef}>
            <h2>{title}</h2>
            <ul className="list">
                {filteredTasks.map((task) => (
                    <Task task={task} key={task.key} />
                ))}
                {isOver && !!hoverItem && (
                    <Task task={hoverItem.task} key={"hover"} preview={true} />
                )}
            </ul>
        </div>
    );
}

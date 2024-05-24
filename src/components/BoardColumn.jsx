import React, { useMemo } from "react";
import Task from "./Task";

export default function BoardColumn({ id, title, tasks }) {
    const filteredTasks = useMemo(() => {
        return Object.entries(tasks)
            .map(([key, data]) => ({ key, ...data }))
            .filter((data) => (data?.column ?? "todo") === id);
    }, [tasks]);
    return (
        <div className="column" id={id}>
            <h2>{title}</h2>
            <ul className="list">
                {filteredTasks.map((task) => (
                    <Task task={task} />
                ))}
            </ul>
        </div>
    );
}

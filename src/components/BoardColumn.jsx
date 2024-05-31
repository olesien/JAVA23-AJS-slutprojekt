import React, { useMemo } from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
export default function BoardColumn({ id, title, tasks, moveTask }) {
    // const { editTask } = useTasks();
    const filteredTasks = useMemo(() => {
        return Object.entries(tasks)
            .map(([key, data]) => ({ key, ...data }))
            .filter((data) => (data?.column ?? "todo") === id);
    }, [tasks]);

    //Put on each of the columns, which indicates to react DND that this is a component that an item can be dropped to
    const [{ isOver, hoverItem }, dropRef] = useDrop(
        {
            accept: "task",
            drop: (item) => {
                const editedTask = { ...item.task };
                console.log(item);

                console.log("MOVING: ", editedTask);
                console.log(item.from, id);
                console.log((item.from ?? "todo") === id);
                if ((item.from ?? "todo") === id) return; //We can't drag it to itself.task.column = id;
                editedTask.column = id;
                moveTask(editedTask);
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                hoverItem: monitor.getItem(),
            }),
        },
        [id, moveTask]
    );
    return (
        <div className="column" id={id} ref={dropRef}>
            <h2>{title}</h2>
            <ul className="list">
                {filteredTasks.map((task) => (
                    <Task task={task} key={task.key} from={id} />
                ))}
                {isOver && !!hoverItem && (
                    <Task
                        task={hoverItem.task}
                        key={"hover"}
                        preview={true}
                        from={id}
                    />
                )}
            </ul>
        </div>
    );
}

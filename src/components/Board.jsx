import React, { useState } from "react";
import BoardColumn from "./BoardColumn";
import { useTasks } from "../hooks/firebase/useTasks";
import MoveTask from "./MoveTask";
import { toast } from "react-toastify";

export default function Board({ tasks, remove }) {
    const { editTask } = useTasks();
    const [assignTaskForm, setAssignTaskForm] = useState(null);

    //Edit the task
    const submit = (e, task, assignee) => {
        e.preventDefault();
        if (assignee.length < 3) {
            toast.error("The assignee name is too short (min 3)");
            return;
        }
        editTask({ ...task, assignee });
        setAssignTaskForm(null);
    };

    //Move the task to another column. If it doesn't already have an asignee set, then prompt for that first.
    const moveTask = (task) => {
        if (task?.assignee) {
            //Check if we have already assigned a person to this one.
            editTask(task);
        } else {
            setAssignTaskForm(task);
        }
    };
    return (
        <div className="container">
            <div className="board">
                <BoardColumn
                    id="todo"
                    title="To Do"
                    tasks={tasks}
                    remove={remove}
                    moveTask={moveTask}
                />
                <BoardColumn
                    id="inprogress"
                    title="In Progress"
                    tasks={tasks}
                    remove={remove}
                    setAssignTaskForm={setAssignTaskForm}
                    moveTask={moveTask}
                />
                <BoardColumn
                    id="done"
                    title="Done"
                    tasks={tasks}
                    remove={remove}
                    setAssignTaskForm={setAssignTaskForm}
                    moveTask={moveTask}
                />
            </div>
            {!!assignTaskForm && (
                <MoveTask
                    close={() => setAssignTaskForm(null)}
                    submit={submit}
                    task={assignTaskForm}
                />
            )}
        </div>
    );
}

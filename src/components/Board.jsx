import React from "react";
import BoardColumn from "./BoardColumn";

export default function Board({ tasks, remove }) {
    return (
        <div className="container">
            <div className="board">
                <BoardColumn
                    id="todo"
                    title="To Do"
                    tasks={tasks}
                    remove={remove}
                />
                <BoardColumn
                    id="inprogress"
                    title="In Progress"
                    tasks={tasks}
                    remove={remove}
                />
                <BoardColumn
                    id="done"
                    title="Done"
                    tasks={tasks}
                    remove={remove}
                />
            </div>
        </div>
    );
}

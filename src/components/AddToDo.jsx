import React, { useState } from "react";
import AddForm from "./AddForm";
import { toast } from "react-toastify";

export default function AddToDo({ addTask }) {
    const [showForm, setShowForm] = useState(false);

    const submit = (e, content, type) => {
        e.preventDefault();
        if (content.length < 4) {
            toast.error("The content is too short (min 4)");
            return;
        }
        addTask({ content, type, column: "todo" });
        setShowForm(false);
    };
    return (
        <div className="addTask">
            <button onClick={() => setShowForm(true)}>Add Task</button>
            {showForm && (
                <AddForm close={() => setShowForm(false)} submit={submit} />
            )}
        </div>
    );
}

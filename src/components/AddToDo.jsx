import React, { useState } from "react";
import AddForm from "./AddForm";

export default function AddToDo({ addTask }) {
    const [showForm, setShowForm] = useState(false);

    const submit = (e, content, type) => {
        console.log(e);
        e.preventDefault();
        console.log(content, type);
        addTask({ content, type });
        setShowForm(false);
    };
    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add Task</button>
            {showForm && (
                <AddForm close={() => setShowForm(false)} submit={submit} />
            )}
        </div>
    );
}

import React, { useState } from "react";
import AddForm from "./AddForm";

export default function AddToDo({ addTask }) {
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add Task</button>
            {showForm && <AddForm close={() => setShowForm(false)} />}
        </div>
    );
}

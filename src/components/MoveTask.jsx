import React, { useState } from "react";

export default function MoveTask({ close, submit, task }) {
    const [assignee, setAsignee] = useState("");

    return (
        <div id="overlay">
            <div className="overlay-content">
                <div className="close-overlay">
                    <p onClick={() => close()}>X</p>
                </div>
                <h3>Assign Task</h3>
                <form
                    method="post"
                    onSubmit={(e) => submit(e, task, assignee)}
                    className="overlay-form"
                >
                    <label>
                        <span>Asignee</span>
                        <input
                            value={assignee}
                            onChange={(v) => setAsignee(v.target.value)}
                            type="text"
                            name="asignee"
                            id="asignee"
                            placeholder="Assign person"
                            minLength={4}
                        />
                    </label>
                    <button type="Add">Assign & Move</button>
                </form>
            </div>
        </div>
    );
}

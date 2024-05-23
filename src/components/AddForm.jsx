import React from "react";

export default function AddForm({ close }) {
    const clickedForm = (e) => {
        e.stopPropagation();
    };
    return (
        <div id="overlay" onClick={() => close()}>
            <div className="overlay-form" onClick={clickedForm}>
                <div className="close-overlay">
                    <p onClick={() => close()}>X</p>
                </div>
                <h3>Add Task</h3>
            </div>
        </div>
    );
}

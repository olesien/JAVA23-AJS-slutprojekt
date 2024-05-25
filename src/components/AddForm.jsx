import React, { useState } from "react";

export default function AddForm({ close, submit }) {
    const [content, setContent] = useState("");
    const [type, setType] = useState("ux");

    return (
        <div id="overlay">
            <div className="overlay-content">
                <div className="close-overlay">
                    <p onClick={() => close()}>X</p>
                </div>
                <h3>Add Task</h3>
                <form
                    method="post"
                    onSubmit={(e) => submit(e, content, type)}
                    className="overlay-form"
                >
                    <label>
                        <span>Content</span>
                        <input
                            value={content}
                            onChange={(v) => setContent(v.target.value)}
                            type="text"
                            name="content"
                            id="content"
                            placeholder="fix everything"
                            minLength={3}
                        />
                    </label>
                    <label>
                        <span>Type</span>
                        <select
                            name="type"
                            id="type"
                            value={type}
                            onChange={(v) => setType(v.target.value)}
                        >
                            <option value="ux">UX</option>
                            <option value="devbackend">Dev Backend</option>
                            <option value="devfrontend">Dev Frontend</option>
                            <option value="bug">Bug</option>
                        </select>
                    </label>
                    <button type="Add">Submit</button>
                </form>
            </div>
        </div>
    );
}

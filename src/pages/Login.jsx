import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Login({ login }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submit = (e) => {
        e.preventDefault();
        if (email.length < 3) {
            toast.error("Email needs to be at least 3 characters");
            return;
        }

        if (password.length < 3) {
            toast.error("Password needs to be at least 3 characters");
            return;
        }
        login(email, password);
    };
    return (
        <div className="auth-overlay">
            <div className="auth-panel">
                <h2>Login</h2>
                <form method="post" onSubmit={(e) => submit(e)}>
                    <label>
                        Email:{" "}
                        <input
                            type="email"
                            name="Email"
                            id="email"
                            minLength={3}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:{" "}
                        <input
                            type="password"
                            name="Password"
                            id="Password"
                            minLength={3}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}

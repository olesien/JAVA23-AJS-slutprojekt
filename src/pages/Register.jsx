import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Register({ register }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        if (password != confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        register(email, password);
    };
    return (
        <div className="auth-overlay">
            <div className="auth-panel">
                <h2>Register</h2>
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
                    <label>
                        Reenter Password:{" "}
                        <input
                            type="password"
                            name="RenterPassword"
                            id="RenterPassword"
                            minLength={3}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
}

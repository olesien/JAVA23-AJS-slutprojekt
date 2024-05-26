import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register({ register }) {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();

        if (email.length < 3) {
            toast.error("Email needs to be at least 3 characters");
            return;
        }

        if (displayName.length < 3) {
            toast.error("Display Name needs to be at least 3 characters");
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

        register(email, password, displayName);
    };
    return (
        <div className="auth-overlay">
            <div className="auth-panel">
                <h2>Register</h2>
                <form method="post" onSubmit={(e) => submit(e)}>
                    <label>
                        <span className="label">Email:</span>
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
                        <span className="label">Display Name:</span>
                        <input
                            type="text"
                            name="Display Name"
                            id="displayName"
                            minLength={3}
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                    <label>
                        <span className="label">Password:</span>
                        <input
                            type="password"
                            name="Password"
                            id="Password"
                            autoComplete="password"
                            minLength={3}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <span className="label">Reenter Password:</span>
                        <input
                            type="password"
                            name="RenterPassword"
                            id="RenterPassword"
                            autoComplete="password"
                            minLength={3}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Register" />
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to={"/login"}>Login here</Link>
                </p>
            </div>
        </div>
    );
}

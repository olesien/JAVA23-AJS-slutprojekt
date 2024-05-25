import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { app } from "../../lib/firebase";

const auth = getAuth(app);

export function useAuth() {
    const [user, setUser] = useState(null);

    const logout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                toast.success("Logged out successfully");
            })
            .catch((error) => {
                // An error happened.
                toast.error(error);
            });
    };

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                toast.success("Succesfully logged in!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };

    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
                toast.success("Succesfully registered!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                // ..
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(user);
                // ...
            } else {
                // User is signed out
                setUser(null);
                // ...
            }
        });
    }, []);
    return { user, login, register, logout };
}

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
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
                toast.success("Successfully logged in!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };

    const register = (email, password, displayName) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Updating user name
                await updateProfile(auth.currentUser, { displayName });
                //Set user directly because otherwise name doesn't come first time
                setUser({ ...userCredential.user, displayName });
                //const user = userCredential.user;
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
        const cleanup = onAuthStateChanged(auth, (user) => {
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
        return () => cleanup();
    }, []);
    return { user, login, register, logout };
}

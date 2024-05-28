import { useEffect, useState } from "react";
import { app } from "../../lib/firebase";
import {
    getDatabase,
    ref,
    onValue,
    update,
    push,
    remove,
} from "firebase/database";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
const db = getDatabase(app);

//useTasks is a custom hook that allows you to interact with the firebase database easily.
//Note: Using in multiple different places might lead to many listeners being setup, which is not optimized.
//Because this is just a test project this is currently the case but later on it should either be in just one place or a Context should be setup to store global data
export function useTasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState({});
    const uid = user?.uid ?? "Anonymous";

    //The REF to the tasks, along with the unique ID that comes with a user.
    const tasksRef = ref(db, "/tasks/" + uid);

    const addTask = (data) => {
        try {
            const newTasks = { ...tasks, [push(tasksRef)?.key ?? "err"]: data };
            update(tasksRef, newTasks);
        } catch (err) {
            toast.error("Something went wrong adding the task");
            console.log(err);
        }
    };

    const editTask = (data) => {
        try {
            const key = data.key;
            const taskRef = ref(db, `tasks/${uid}/${key}/`);
            delete data.key; //We don't need that to come with.
            update(taskRef, data);
        } catch (err) {
            toast.error("Something went wrong editing the task.");
            console.log(err);
        }
    };

    const removeTask = (key) => {
        try {
            const taskToDeleteRef = ref(db, `tasks/${uid}/${key}/`);
            remove(taskToDeleteRef);
        } catch (err) {
            toast.error("Something went wrong removing the task.");
            console.log(err);
        }
    };

    useEffect(() => {
        const cleanup = onValue(tasksRef, (snapshot) => {
            const tasks = snapshot.val();
            setTasks(tasks ?? {});
        });
        return () => cleanup();
    }, [user]);
    return { tasks, addTask, removeTask, editTask };
}

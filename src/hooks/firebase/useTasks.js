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
const db = getDatabase(app);

//useTasks is a custom hook that allows you to interact with the firebase database easily.
//Note: Using in multiple different places might lead to many listeners being setup, which is not optimized.
//Because this is just a test project this is currently the case but later on it should either be in just one place or a Context should be setup to store global data
export function useTasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState({});
    const uid = user?.uid ?? "Anonymous";

    const tasksRef = ref(db, "/tasks/" + uid);

    const addTask = (data) => {
        const newTasks = { ...tasks, [push(tasksRef)?.key ?? "err"]: data };
        update(tasksRef, newTasks);
    };

    const editTask = (data) => {
        const key = data.key;
        const taskRef = ref(db, `tasks/${uid}/${key}/`);
        delete data.key; //We don't need that to come with.
        update(taskRef, data);
    };

    const removeTask = (key) => {
        const taskToDeleteRef = ref(db, `tasks/${uid}/${key}/`);
        remove(taskToDeleteRef);
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

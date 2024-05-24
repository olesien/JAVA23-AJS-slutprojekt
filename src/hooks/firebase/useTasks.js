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
const db = getDatabase(app);
const tasksRef = ref(db, "tasks");
export function useTasks() {
    const [tasks, setTasks] = useState({});

    const addTask = (data) => {
        const newTasks = { ...tasks, [push(tasksRef)?.key ?? "err"]: data };
        update(tasksRef, newTasks);
    };

    const editTask = (data) => {
        const key = data.key;
        const taskRef = ref(db, `tasks/${key}/`);
        delete data.key; //We don't need that to come with.
        update(taskRef, data);
    };

    const removeTask = (key) => {
        const taskToDeleteRef = ref(db, `tasks/${key}/`);
        remove(taskToDeleteRef);
    };

    useEffect(() => {
        onValue(tasksRef, (snapshot) => {
            const tasks = snapshot.val();
            console.log(tasks);
            setTasks(tasks);
        });
    }, []);
    return { tasks, addTask, removeTask, editTask };
}

import { useEffect, useState } from "react";
import { app, firebaseConfig } from "../../lib/firebase";
import { getDatabase, ref, onValue } from "firebase/database";

export function useTasks() {
    const [tasks, setTasks] = useState([]);

    const addTask = () => {};

    useEffect(() => {
        const db = getDatabase(app);
        console.log(firebaseConfig);
        const tasksRef = ref(db, "tasks");
        onValue(tasksRef, (snapshot) => {
            const tasks = snapshot.val();
            console.log(tasks);
            setTasks(tasks);
        });
    }, []);
    return { tasks, addTask };
}

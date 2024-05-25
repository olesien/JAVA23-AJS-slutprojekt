import { ToastContainer } from "react-toastify";
import AddToDo from "./components/AddToDo";
import Board from "./components/Board";
import { useTasks } from "./hooks/firebase/useTasks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/firebase/useAuth";

export function App() {
    const { tasks, addTask } = useTasks();
    const { user, login, register, logout } = useAuth();

    console.log(tasks);
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <h1>Scrum Board</h1>
                <AddToDo addTask={addTask} />
                <Board tasks={tasks} />
            </DndProvider>
            <ToastContainer />
        </>
    );
}

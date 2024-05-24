import AddToDo from "./components/AddToDo";
import Board from "./components/Board";
import { useTasks } from "./hooks/firebase/useTasks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
    const { tasks, addTask } = useTasks();

    console.log(tasks);
    return (
        <DndProvider backend={HTML5Backend}>
            <h1>Scrum Board</h1>
            <AddToDo addTask={addTask} />
            <Board tasks={tasks} />
        </DndProvider>
    );
}

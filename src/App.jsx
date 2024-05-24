import AddToDo from "./components/AddToDo";
import Board from "./components/Board";
import { useTasks } from "./hooks/firebase/useTasks";

export function App() {
    const { tasks, addTask } = useTasks();

    console.log(tasks);
    return (
        <div>
            <h1>Scrum Board</h1>
            <AddToDo addTask={addTask} />
            <Board tasks={tasks} />
        </div>
    );
}

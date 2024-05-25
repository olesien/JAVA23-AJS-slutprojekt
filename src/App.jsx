import { ToastContainer } from "react-toastify";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/firebase/useAuth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrumBoard from "./pages/ScrumBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";

export function App() {
    const { user, login, register, logout } = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ScrumBoard />,
        },
        {
            path: "/login",
            element: <Login login={login} />,
        },
        {
            path: "/register",
            element: <Register register={register} />,
        },
    ]);
    if (!user) {
    }
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <RouterProvider router={router} />
            </DndProvider>
            <ToastContainer />
        </>
    );
}

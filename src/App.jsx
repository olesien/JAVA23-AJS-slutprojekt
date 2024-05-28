import { ToastContainer } from "react-toastify";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from "./hooks/firebase/useAuth";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import ScrumBoard from "./pages/ScrumBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "react-toastify/dist/ReactToastify.css";
import "./css/auth.css";

export function App() {
    const { user, login, register, logout } = useAuth();

    const router = createHashRouter(
        [
            {
                path: "/login",
                element: (
                    <>
                        {!!user ? (
                            <Navigate to={"/"} replace />
                        ) : (
                            <Login login={login} />
                        )}
                    </>
                ),
            },
            {
                path: "/register",
                element: (
                    <>
                        {!!user ? (
                            <Navigate to={"/"} replace />
                        ) : (
                            <Register register={register} />
                        )}
                    </>
                ),
            },
            {
                path: "/*",
                element: (
                    <>
                        {!user ? (
                            <Navigate to={"login"} replace />
                        ) : (
                            <ScrumBoard logout={logout} />
                        )}
                    </>
                ),
            },
        ],
        { basename: "/" }
    );
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

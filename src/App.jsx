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

    //Use an hash router, because the default router does not work with GitHub Pages.
    const router = createHashRouter(
        [
            {
                path: "/login",
                element: (
                    <>
                        {/* If user is truthy, we want to navigate to the home page, otherwise show the login and pass in the login function */}
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
                        {/* If user is truthy, we want to navigate to the home page, otherwise show the register and pass in the register function */}
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
                        {/* If user is falsy, we want to navigate to the login page, otherwise show the board and pass in the logout function */}
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
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <RouterProvider router={router} />
            </DndProvider>
            {/* Toast container used for popups on status updates like success and fails */}
            <ToastContainer />
        </>
    );
}

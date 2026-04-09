import { BrowserRouter, Routes } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import {chatRoutes} from "./chat.routes.tsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {authRoutes}
                {chatRoutes}
            </Routes>
        </BrowserRouter>
    );
}
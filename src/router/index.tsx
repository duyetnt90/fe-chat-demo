import { BrowserRouter, Routes } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import { chatRoutes } from "./chat.routes.tsx";
import { userRoutes } from "./user.routes.tsx";
import Header from "../components/Header";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {authRoutes}
                {chatRoutes}
                {userRoutes}
            </Routes>
        </BrowserRouter>
    );
}
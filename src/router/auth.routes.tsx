import { Route } from "react-router-dom"
import Landing from "../pages/Landing.tsx";

export const authRoutes = (
    <Route path="/" element={<Landing />} />
)
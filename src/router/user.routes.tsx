import { Route } from "react-router-dom"
import Profile from "../pages/Profile.tsx";

export const userRoutes = (
    <Route path="/profile" element={<Profile />} />
)
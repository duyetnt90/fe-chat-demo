import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import { socketService } from "../socket/socket.service";
import type {LoginPayload, User} from "../types/auth.type.ts";

type AuthContextType = {
    user: any;
    setUser: (user: User) => void;
    login: (data: any) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            // Connect to socket if user is already logged in
            socketService.connect();
        }
    }, []);

    const login = async (data: LoginPayload) => {
        const user: User = await authService.login(data);
        setUser(user);
        // Connect to socket after successful login
        await socketService.connect();
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
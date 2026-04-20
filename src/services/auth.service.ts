import {login, register} from "../api/auth.api";
import {cache} from "../cache/cache";
import type {AuthResponse, LoginPayload, RegisterPayload, User} from "../types/auth.type";
import type {AxiosResponse} from "axios";

const USER_KEY = "current_user";

export const authService = {
    async login(data: LoginPayload): Promise<User> {
        const res: AxiosResponse = await login(data);

        const dataLogin: AuthResponse = res.data;
        const user: User = dataLogin.user;

        // Store user in cache only (token is now in HttpOnly cookie)
        cache.set(USER_KEY, user);

        return user;
    },

    async register(data: RegisterPayload): Promise<User> {
        const res: AxiosResponse = await register(data);

        return res.data;
    },

    getCurrentUser() {
        try {
            // Check memory cache first
            let user: User | null = cache.get(USER_KEY);
            if (user) {
                return user;
            }

            return null;
        } catch (err) {
            console.error(err)
            return null;
        }
    },

    setCurrentUser(user: User): void {
        cache.set(USER_KEY, user);
    },

    getToken() {
        // Token is now in HttpOnly cookie, not accessible from JavaScript
        return null;
    },

    logout() {
        cache.delete(USER_KEY);
        // Clear the HttpOnly cookie by making a logout request
        // This will be handled by the backend clearing the cookie
    }
};
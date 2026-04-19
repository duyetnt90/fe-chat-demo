export interface RegisterPayload {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    content?: string;
}

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    content?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}
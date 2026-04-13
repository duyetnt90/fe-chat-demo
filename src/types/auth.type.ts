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
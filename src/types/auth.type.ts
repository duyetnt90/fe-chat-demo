export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
}
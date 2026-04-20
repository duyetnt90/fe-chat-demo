export interface SendMessagePayload {
    conversationId: string;
    senderId: string;
    content: string;
    type?: "text" | "image";
}

export interface ReceiveMessagePayload {
    conversationId: string;
    senderId: string;
    content: string;
    type?: "text" | "image";
    createdAt: string;
    _id: string;
}
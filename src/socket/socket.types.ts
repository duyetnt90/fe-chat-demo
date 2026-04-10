export interface SendMessagePayload {
    roomId: string;
    context: string;
    senderId: string;
}

export interface ReceiveMessagePayload {
    roomId: string;
    context: string;
    senderId: string;
    createdAt: string;
}
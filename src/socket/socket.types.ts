export interface SendMessagePayload {
    roomId: string;
    text: string;
    senderId: string;
}

export interface ReceiveMessagePayload {
    roomId: string;
    text: string;
    senderId: string;
    createdAt: string;
}
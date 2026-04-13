export interface MessagePayload {
    conversationId: string;
    senderId: string;
    type?: string;
    content?: string;
}
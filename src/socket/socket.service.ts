import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "./socket.events";
import type {
    SendMessagePayload,
    ReceiveMessagePayload
} from "./socket.types";

class SocketService {
    private socket: Socket | null = null;

    connect(userId: string) {
        if (this.socket) return;
        this.socket = io(import.meta.env.VITE_SOCKET_URL, {
            query: { userId },
            transports: ["websocket"],
        });

        this.socket?.on(SOCKET_EVENTS.CONNECT, () => {
            console.log("✅ Socket connectedddd :", this.socket?.id);
        });

        this.socket?.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log("❌ Socket disconnected");
        });
    }

    onConnect(callback: ()=> void) {
        console.log("✅ Socket id :", this.socket?.id);
        this.socket?.on(SOCKET_EVENTS.CONNECT, callback)
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }

    // =========================
    // ROOM
    // =========================
    joinRoom(conversationId: string) {
        console.log("Join success!", conversationId)
        this.socket?.emit(SOCKET_EVENTS.JOIN_ROOM, conversationId);
    }

    // =========================
    // MESSAGE
    // =========================
    sendMessage(payload: SendMessagePayload) {
        this.socket?.emit(SOCKET_EVENTS.SEND_MESSAGE, payload);
    }

    onMessage(callback: (data: any) => void ) {
        this.socket?.on(SOCKET_EVENTS.RECEIVE_MESSAGE, callback)
    }

    offMessage(callback: (data: any) => void ) {
        this.socket?.off(SOCKET_EVENTS.RECEIVE_MESSAGE, callback)
    }

    onReceiveMessage(callback: (data: ReceiveMessagePayload) => void) {
        this.socket?.on(SOCKET_EVENTS.RECEIVE_MESSAGE, callback);
    }

    offReceiveMessage() {
        this.socket?.off(SOCKET_EVENTS.RECEIVE_MESSAGE);
    }
}

export const socketService = new SocketService();
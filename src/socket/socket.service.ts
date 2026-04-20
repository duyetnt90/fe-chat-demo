import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "./socket.events";
import api from "../api/axios";
import type {
    SendMessagePayload,
    ReceiveMessagePayload
} from "./socket.types";

class SocketService {
    private socket: Socket | null = null;

    async connect() {
        if (this.socket) return;

        try {
            // Get socket token from backend
            const response = await api.get('/auth/socket-token');
            const socketToken = response.data.token;

            this.socket = io(import.meta.env.VITE_SOCKET_URL, {
                auth: { token: socketToken },
                transports: ["websocket"],
            });

            this.socket?.on(SOCKET_EVENTS.CONNECT, () => {
                console.log("✅ Socket connected :", this.socket?.id);
            });

            this.socket?.on(SOCKET_EVENTS.DISCONNECT, () => {
                console.log("❌ Socket disconnected");
            });
        } catch (error) {
            console.error("Failed to get socket token:", error);
        }
    }

    onConnect(callback: () => void) {
        if (this.socket?.connected) {
            console.log("✅ Socket id :", this.socket?.id);
            callback(); // ✅ đã connect thì gọi luôn
            return;
        }

        this.socket?.once(SOCKET_EVENTS.CONNECT, callback);
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

    onReceiveMessage(callback: (data: ReceiveMessagePayload) => void) {
        this.socket?.on(SOCKET_EVENTS.RECEIVE_MESSAGE, callback);
    }

    offReceiveMessage() {
        this.socket?.off(SOCKET_EVENTS.RECEIVE_MESSAGE);
    }
}

export const socketService = new SocketService();
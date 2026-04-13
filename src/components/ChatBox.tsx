import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat.ts";
import { messageService } from "../services/message.service";
import { authService } from "../services/auth.service";
import { socketService } from "../socket/socket.service";
import type { User } from "../types/auth.type.ts";

export default function ChatBox() {
    const { currentChat } = useChat();

    const [messages, setMessages] = useState<any[]>([]);
    const [content, setText] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);

    const user: User = authService.getCurrentUser();

    const senderId = user._id;
    const conversationId = currentChat?._id;

    const receiverId = currentChat?.members.find(
        (id: string) => id !== senderId
    );

    // ✅ load message + socket realtime
    useEffect(() => {
        if (!conversationId) return;

        // load history
        messageService.get(conversationId).then((data) => {
            setMessages(data);
        });

        socketService.onConnect(() => {
            socketService.joinRoom(conversationId)
        })

        // listen socket
        const handleMessage = (msg: any) => {
            if (msg.conversationId !== conversationId) return;

            setMessages((prev) => {
                const exists = prev.some((m) => m._id === msg._id);
                if (exists) return prev;

                return [...prev, msg];
            });
        };

        socketService.onReceiveMessage(handleMessage);

        return () => {
            socketService.offReceiveMessage();
        };
    }, [conversationId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async () => {
        if (!content.trim() || !conversationId) return;

        const msg = {
            conversationId,
            senderId,
            receiverId,
            content,
        };

        const saved = await messageService.send(msg);

        socketService.sendMessage(saved);

        setText("");
    };

    if (!currentChat) return <div style={{ flex: 1 }}>Chat with me</div>;

    return (
        <div className="d-flex flex-column h-100">

            {/* Header */}
            <div className="border-bottom p-2">
                Chat
            </div>

            <div className="flex-grow-1 overflow-auto p-3">
                {messages.map((m) => {
                    const isMe = m.senderId === senderId;

                    return (
                        <div
                            key={m._id}
                            className={`d-flex mb-2 ${
                                isMe ? "justify-content-end" : ""
                            }`}
                        >
                            <div
                                className={`p-2 rounded ${
                                    isMe
                                        ? "bg-primary text-white"
                                        : "bg-light"
                                }`}
                                style={{maxWidth: "60%"}}
                            >
                                {m.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef}></div>
            </div>

            <div className="border-top p-2 d-flex gap-2">
                <input
                    className="form-control"
                    value={content}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && send()}
                />
                <button className="btn btn-primary" onClick={send}>
                    Send
                </button>
            </div>
        </div>
    );
}
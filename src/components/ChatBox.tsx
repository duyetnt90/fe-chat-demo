import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/userChat.ts";
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

            console.log("Log message: ", msg)

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

    // ✅ auto scroll xuống cuối
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
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh"
        }}>
            <h4 style={{ padding: "10px" }}>Chat</h4>

            {/* MESSAGE LIST */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "10px",
                background: "#f5f5f5"
            }}>
                {messages.map((m) => {
                    const isMe = m.senderId === senderId;

                    return (
                        <div
                            key={m._id} // ✅ fix key duplicate
                            style={{
                                display: "flex",
                                justifyContent: isMe ? "flex-end" : "flex-start",
                                marginBottom: 10,
                            }}
                        >
                            <div
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: 12,
                                    background: isMe ? "#0d6efd" : "#e4e6eb",
                                    color: isMe ? "#fff" : "#000",
                                    maxWidth: "60%",
                                }}
                            >
                                {m.content}
                            </div>
                        </div>
                    );
                })}

                <div ref={scrollRef} />
            </div>

            {/* INPUT */}
            <div style={{
                display: "flex",
                gap: 10,
                padding: 10,
                borderTop: "1px solid #ddd"
            }}>
                <input
                    value={content}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    style={{ flex: 1, padding: 8 }}
                />
                <button onClick={send}>Send</button>
            </div>
        </div>
    );
}
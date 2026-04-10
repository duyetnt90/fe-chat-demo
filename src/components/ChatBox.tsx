import { useEffect, useState } from "react";
import { useChat } from "../hooks/userChat.ts";
import { messageService } from "../services/message.service";
import { authService } from "../services/auth.service";
import { socketService } from "../socket/socket.service";

export default function ChatBox() {
    const { currentChat } = useChat();

    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState("");

    const { user } = authService.getCurrentUser();

    const senderId = user._id;
    const conversationId = currentChat?._id;

    const receiverId = currentChat?.members.find(
        (id: string) => id !== senderId
    );

    useEffect(() => {
        if (!conversationId) return;

        messageService.get(conversationId).then(setMessages);

        socketService.onMessage((msg) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, [conversationId]);

    const send = async () => {
        const msg = {
            conversationId,
            senderId,
            receiverId,
            text,
        };

        const saved = await messageService.send(msg);

        socketService.sendMessage(saved);

        setMessages((prev) => [...prev, saved]);
        setText("");
    };

    if (!currentChat) return <div>Select a conversation</div>;

    return (
        <div>
            <h3>Chat</h3>

            {messages.map((m, i) => (
                <div key={i}>{m.text}</div>
            ))}

            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={send}>Send</button>
        </div>
    );
}
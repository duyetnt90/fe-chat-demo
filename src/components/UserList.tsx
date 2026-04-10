import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { conversationService } from "../services/conversation.service";
import { useChat } from "../hooks/userChat.ts";
import {socketService} from "../socket/socket.service.ts";

export default function UserList() {
    const [users, setUsers] = useState<any[]>([]);
    const { setCurrentChat, setConversations, currentChat } = useChat();

    const currentUser = authService.getCurrentUser();
    const conversationId = currentChat?._id;

    useEffect(() => {
        if (!conversationId) return;
        socketService.onConnect(() => {
            socketService.joinRoom(conversationId)
        })

    }, [conversationId]);

    useEffect(() => {
        userService.getUsers(currentUser._id).then(setUsers);
    }, []);

    const handleSelectUser = async (user: any) => {
        try {
            // 👉 tạo hoặc lấy conversation
            const conv = await conversationService.create(
                currentUser._id,
                user._id
            );

            // 👉 update list nếu chưa có
            setConversations((prev: any[]) => {
                const exists = prev.find((c) => c._id === conv._id);
                if (exists) return prev;
                return [...prev, conv];
            });

            // 👉 set chat hiện tại
            setCurrentChat(conv);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ width: 200 }}>
            <h4>Users</h4>

            {users.map((u) => (
                <div
                    key={u._id}
                    onClick={() => handleSelectUser(u)}
                    style={{ cursor: "pointer", padding: 5 }}
                >
                    {u.username}
                </div>
            ))}
        </div>
    );
}
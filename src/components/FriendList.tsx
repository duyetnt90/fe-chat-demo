import { useEffect, useState } from "react";
import { friendService } from "../services/friend.service";
import type {User} from "../types/auth.type.ts";
import {authService} from "../services/auth.service.ts";
import {conversationService} from "../services/conversation.service.ts";
import {useChat} from "../hooks/userChat.ts";

export default function FriendList() {
    const [friends, setFriends] = useState<any[]>([]);
    const currentUser = authService.getCurrentUser();
    const { setCurrentChat, setConversations } = useChat();
    const userId: string = currentUser?._id;

    useEffect(() => {
        friendService.getFriends(userId).then(setFriends);
    }, []);

    const handleSelectUser = async (user: any) => {
        try {
            // 👉 create or get conversation
            const conv = await conversationService.create(
                currentUser._id,
                user._id
            );

            // 👉 update list if not exists
            setConversations((prev: any[]) => {
                const exists = prev.find((c) => c._id === conv._id);
                if (exists) return prev;
                return [...prev, conv];
            });

            setCurrentChat(conv);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h4>Friends</h4>
            {friends.map((u) => (
                <div
                    key={u._id}
                    className="d-flex align-items-center gap-2 p-2 rounded hover-bg"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectUser(u)}
                >
                    <img
                        src={u.avatar || "https://i.pravatar.cc/40"}
                        width={40}
                        height={40}
                        className="rounded-circle"
                    />
                    <span>{u.name}</span>
                </div>
            ))}

        </div>
    );
}
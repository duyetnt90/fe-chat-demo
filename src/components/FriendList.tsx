import { useEffect, useState } from "react";
import { friendService } from "../services/friend.service";
import {authService} from "../services/auth.service.ts";
import { useChat } from "../hooks/useChat.ts";
import {getAvatarUrl} from "../utils/comom.ts";

export default function FriendList() {
    const [friends, setFriends] = useState<any[]>([]);
    const currentUser = authService.getCurrentUser();
    const userId: string = currentUser?._id;
    const { openChat } = useChat();

    useEffect(() => {
        friendService.getFriends(userId).then(setFriends);
    }, []);


    return (
        <div>
            {friends.map((u) => (
                <div
                    key={u._id}
                    className="d-flex align-items-center gap-2 p-2 rounded hover-bg"
                    style={{ cursor: "pointer" }}
                    onClick={() => openChat(u)}
                >
                    <img
                        src={getAvatarUrl(u.avatar)}
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
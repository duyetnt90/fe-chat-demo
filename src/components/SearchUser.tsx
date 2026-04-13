import { useState } from "react";
import { userService } from "../services/user.service";
import { friendService } from "../services/friend.service";
import {useChat} from "../hooks/useChat.ts";
import {getAvatarUrl} from "../utils/comom.ts";

export default function SearchUser() {
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { openChat } = useChat();

    const search = async () => {
        if (!keyword.trim()) return;

        setLoading(true);
        const res = await userService.search(keyword);
        setUsers(res);
        setLoading(false);
    };

    const addFriend = async (id: string) => {
        await friendService.sendRequest(id);

        setUsers((prev) =>
            prev.map((u) =>
                u._id === id
                    ? { ...u, friendStatus: "pending" }
                    : u
            )
        );
    };

    return (
        <div>
            {/* Search box */}
            <div className="input-group mb-2">
                <input
                    className="form-control"
                    placeholder="🔍 Search user..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                />
                <button className="btn btn-primary" onClick={search}>
                    Search
                </button>
            </div>

            {/* Loading */}
            {loading && <div className="text-muted">Searching...</div>}

            {/* Result list */}
            <div className="search-user-container">
                {users.map((u) => (
                    <div
                        key={u._id}
                        className="d-flex align-items-center justify-content-between p-2 rounded hover-bg"
                    >
                        {/* Left */}
                        <div className="d-flex align-items-center gap-2">
                            <img
                                src={getAvatarUrl(u.avatar)}
                                width={36}
                                height={36}
                                className="rounded-circle"
                            />
                            <span>{u.name}</span>
                        </div>

                        {/* Right */}
                        <div>
                            {u.friendStatus === "none" && (
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => addFriend(u._id)}
                                >
                                    Add
                                </button>
                            )}

                            {u.friendStatus === "pending" && (
                                <button
                                    className="btn btn-sm btn-secondary"
                                    disabled
                                >
                                    Requested
                                </button>
                            )}

                            {u.friendStatus === "accepted" && (
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openChat(u)}
                                >
                                    💬
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
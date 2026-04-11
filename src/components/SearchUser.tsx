import { useState } from "react";
import { userService } from "../services/user.service";
import { friendService } from "../services/friend.service";

export default function SearchUser() {
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
            <div>
                {users.map((u) => (
                    <div
                        key={u._id}
                        className="d-flex align-items-center justify-content-between p-2 rounded hover-bg"
                    >
                        {/* Left */}
                        <div className="d-flex align-items-center gap-2">
                            <img
                                src={u.avatar || "https://i.pravatar.cc/40"}
                                width={36}
                                height={36}
                                className="rounded-circle"
                            />
                            <span>{u.username}</span>
                        </div>

                        {/* Right */}
                        <button
                            onClick={() => addFriend(u._id)}
                            disabled={u.friendStatus !== "none"}
                            className={`btn btn-sm ${
                                u.friendStatus === "pending"
                                    ? "btn-secondary"
                                    : u.friendStatus === "accepted"
                                        ? "btn-success"
                                        : "btn-outline-primary"
                            }`}
                        >
                            {u.friendStatus === "pending"
                                ? "Requested"
                                : u.friendStatus === "accepted"
                                    ? "Friend"
                                    : "Add Friend"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
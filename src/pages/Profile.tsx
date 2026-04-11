import { useEffect, useState } from "react";
import { userService } from "../services/user.service.ts";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        userService.getMe().then(setUser);
    }, []);

    const handleChange = (e: any) => {
        console.log("user: ", user)
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const save = async () => {
        const updated = await userService.update(user);
        setUser(updated);
        alert("Updated!");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-4" style={{ maxWidth: 500 }}>
            <h3>Profile</h3>

            {/* Avatar */}
            <div className="text-center mb-3">
                <img
                    src={user?.avatar || "https://i.pravatar.cc/100"}
                    width={100}
                    height={100}
                    className="rounded-circle"
                />
            </div>

            <input
                className="form-control mb-2"
                name="avatar"
                placeholder="Avatar URL"
                value={user?.avatar || ""}
                onChange={handleChange}
            />

            <input
                className="form-control mb-2"
                name="username"
                placeholder="Username"
                value={user?.username}
                onChange={handleChange}
            />

            <textarea
                className="form-control mb-2"
                name="content"
                placeholder="content"
                value={user.content || ""}
                onChange={handleChange}
            />

            <button className="btn btn-primary w-100" onClick={save}>
                Save
            </button>
        </div>
    );
}
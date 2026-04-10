import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import type { User } from "../types/auth.type";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const user: User = authService.getCurrentUser();
        setUser(user);
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            <p>{user?.email}</p>
        </div>
    );
}
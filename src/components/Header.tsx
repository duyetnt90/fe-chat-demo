import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useEffect, useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate("/");
    };
    return (
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
            {/* Left */}
            <div onClick={() => navigate("/chat")} className="fw-bold" style={{ cursor: "pointer" }}>Chat App</div>
            {/* Right */}

            {user && (
                <div className="d-flex align-items-center gap-2">
                    <span>{user.name}</span>

                    <img
                        src={user.avatar || "https://i.pravatar.cc/40"}
                        width={36}
                        height={36}
                        className="rounded-circle"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/profile")}
                    />

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
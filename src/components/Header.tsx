import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import type {User} from "../types/auth.type.ts";

export default function Header() {
    const navigate = useNavigate();
    const user: User = authService.getCurrentUser();

    return (
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">

            {/* Left */}
            <div onClick={() => navigate("/chat")} className="fw-bold" style={{ cursor: "pointer" }}>Chat App</div>

            {/* Right */}
            <div className="d-flex align-items-center gap-2">
                <span>{user?.username}</span>

                <img
                    src={user?.avatar || "https://i.pravatar.cc/40"}
                    width={36}
                    height={36}
                    className="rounded-circle"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/profile")}
                />
            </div>
        </div>
    );
}
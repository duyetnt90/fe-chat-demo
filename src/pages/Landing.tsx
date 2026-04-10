import { useState } from "react";
import { authService } from "../services/auth.service.ts";
import type { RegisterPayload } from "../types/auth.type";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterPayload>({
        username: "",
        email: "",
        password: "",
        avatar: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isLogin) {
                await authService.login({
                    email: form.email,
                    password: form.password
                });
            } else {
                await authService.register(form);
            }

            navigate("/chat");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h3 className="text-center mb-3">
                    {isLogin ? "Login" : "Register"}
                </h3>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Username"
                                onChange={(e) =>
                                    setForm({ ...form, username: e.target.value })
                                }
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <input
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                    <button className="btn btn-primary w-100" type="submit">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p
                    className="text-center mt-3 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Chưa có tài khoản? Đăng ký"
                        : "Đã có tài khoản? Đăng nhập"}
                </p>
            </div>
        </div>
    );
}
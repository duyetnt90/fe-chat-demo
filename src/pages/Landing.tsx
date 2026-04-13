import { useState } from "react";
import { authService } from "../services/auth.service.ts";
import type { RegisterPayload } from "../types/auth.type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/auth.context";

export default function Landing() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState<RegisterPayload>({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: ""
    });

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            navigate("/chat");
        }
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isLogin) {
                await login({
                    email: form.email,
                    password: form.password
                });
                navigate("/chat");
            } else {
                await authService.register(form);

                setForm({
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    avatar: ""
                });
                setIsLogin(true);
                alert("Registration successful! Please log in.");
            }
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
                                placeholder="Full name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({...form, name: e.target.value})
                                }
                            />
                        </div>
                    )}
                    {!isLogin && (
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) =>
                                    setForm({...form, username: e.target.value})
                                }
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <input
                            className="form-control"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({...form, email: e.target.value})
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({...form, password: e.target.value})
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
                        ? "I don't have an account yet. Register"
                        : "I already have an account. Login"}
                </p>
            </div>
        </div>
    );
}
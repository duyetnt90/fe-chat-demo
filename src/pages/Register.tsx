import { useState } from "react";
import { register } from "../api/auth.api";
import type { RegisterPayload } from "../types/auth.type";

export default function Register() {
    const [form, setForm] = useState<RegisterPayload>({
        username: "",
        email: "",
        password: "",
        avatar: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await register(form);
            console.log(res.data);
            alert("Register success");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                />

                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
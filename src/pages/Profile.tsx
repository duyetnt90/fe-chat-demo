import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/auth.context";
import {getAvatarUrl} from "../utils/comom.ts"

export default function ProfilePage() {
    let [user, setLocalUser] = useState<any>(null);//setUser
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const { setUser } = useAuth();

    useEffect(() => {
        userService.getMe().then((data) => {
            setUser(data);
            setLocalUser(data);
            if (!avatarFile) {
                setPreview(data.avatar);
            }
        });
    }, []);

    console.log("user: ", user)

    const handleChange = (e: any) => {
        setLocalUser({ ...user, [e.target.name]: e.target.value });
    };

    // 👉 handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        // preview image
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    /**
     * @function update Profile
     */
    const save = async () => {
        try {
            const formData = new FormData();

            formData.append("name", user.name || "");
            formData.append("content", user.content || "");
            formData.append("username", user.username || "");

            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            const updated = await userService.update(formData);

            setUser(updated);
            setAvatarFile(null);
            setPreview(updated.avatar);
            authService.setCurrentUser(updated);

            alert("Updated!");
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-4" style={{ maxWidth: 500 }}>
            <h3 className="mb-3">Profile</h3>

            {/* Avatar */}
            <div className="text-center mb-3">
                <img
                    src={getAvatarUrl(preview || user?.avatar)}
                    width={100}
                    height={100}
                    className="rounded-circle border"
                    style={{ objectFit: "cover" }}
                />
            </div>

            {/* Upload file */}
            <div className="mb-3">
                <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            {/* Name */}
            <input
                className="form-control mb-2"
                name="name"
                placeholder="Full Name"
                value={user?.name || ""}
                onChange={handleChange}
            />

            {/* Info Memo */}
            <textarea
                className="form-control mb-3"
                name="content"
                placeholder="Memo"
                value={user?.content || ""}
                onChange={handleChange}
            />

            <button className="btn btn-primary w-100" onClick={save}>
                Update
            </button>
        </div>
    );
}
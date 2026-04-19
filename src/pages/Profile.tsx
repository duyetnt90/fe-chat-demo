import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/auth.context";
import {getAvatarUrl} from "../utils/comom.ts"
import type {User} from "../types/auth.type.ts";

export default function ProfilePage() {
    let [user, setLocalUser] = useState<any>(null);//setUser
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const { setUser } = useAuth();
    const MAX_SIZE: number = 2 * 1024 * 1024; // 2MB

    const ALLOWED_TYPES: string[] = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    useEffect(() => {
        userService.getMe().then((data: User) => {
            setUser(data);
            setLocalUser(data);
            if (!avatarFile) {
                setPreview(data.avatar ?? '');
            }
        });
    }, []);


    const handleChange = (e: any) => {
        setLocalUser({ ...user, [e.target.name]: e.target.value });
    };

    // 👉 handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // validate type
        if (!ALLOWED_TYPES.includes(file.type)) {
            alert("Chỉ cho phép JPG, PNG, WEBP");
            e.target.value = "";
            return;
        }

        // validate size
        if (file.size > MAX_SIZE) {
            alert("Ảnh tối đa 2MB");
            e.target.value = "";
            return;
        }
        setAvatarFile(file);
        // preview image
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    /**
     * @function update Profile
     */
    const save = async () => {
        const name = user.name?.trim() || "";
        const content = user.content?.trim() || "";

        if (!name) {
            alert("Full name không được để trống");
            return;
        }

        if (name.length > 100) {
            alert("Full name tối đa 100 ký tự");
            return;
        }

        if (content.length > 500) {
            alert("Content tối đa 500 ký tự");
            return;
        }

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
                    accept="image/png,image/jpeg,image/webp"
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
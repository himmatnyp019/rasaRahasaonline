import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./ProfileUpdate.css";
import { toast } from 'react-toastify'
import { assets } from "../../src/assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { t } from "i18next";
const ProfileUpdate = ({ setUpdateMode }) => {
    const { userData, token, url, loadUserData } = useContext(StoreContext);
    const navigate = useNavigate();
    const [name, setName] = useState(userData?.name || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [phone, setPhone] = useState(userData?.phone || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(userData?.image || "");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to update your profile.");
            return;
        }
        const formData = new FormData();
        if (name) formData.append("name", name);
        if (email) formData.append("email", email);
        if (phone) formData.append("phone", phone);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/user/update`, formData, {
                headers: {
                    token,
                },
            });
            if (response.data.success) {
                toast.success("Profile updated successfully!");
                navigate("/Profile");
                loadUserData();
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="profile-update-card">
            <h2 className="profile-title">{t("updateProfile")}</h2>

            <div className="profile-image-container">
                <div className="image-warper">
                    <img src={preview ? preview : assets.dommy_profile} alt="Profile" className="profile-image" />
                </div>
                <label htmlFor="imageUpload" className="upload-btn">
                   {t("changeProfileImage")}
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                />
            </div>

            <form onSubmit={handleUpdate} className="profile-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>{t("name")}</label>
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>{t("email")}</label>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <label>{t("phoneNumber")}</label>
                </div>

                <button type="submit" className="update-btn">
                    {t("updateProfile")}
                </button>
            </form>

            <button className="reset-btn" onClick={() => setUpdateMode("resetPassword")}>{t("resetPassword")}</button>
        </div>
    );
};

export default ProfileUpdate;

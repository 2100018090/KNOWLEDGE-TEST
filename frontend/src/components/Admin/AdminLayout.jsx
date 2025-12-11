import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { logout } from "../services/authService";
import { useProfile } from "../services/methodService";
import ProfileModal from "./Modal/ProfileModal";

export default function AdminLayout({ children }) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Modal profile
    const [modalProfileOpen, setModalProfileOpen] = useState(false);
    const profile = useProfile();

    // Ambil data user dari localStorage saat component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        logout(setUser, navigate);
    };

    return (
        <div className="d-flex">
            <AdminSidebar />

            <div className="flex-grow-1">
                <AdminNavbar user={user} onLogout={handleLogout} onProfileClick={() => setModalProfileOpen(true)} />
                <div className="p-4">
                    {children}
                </div>
                {/* Modal Profile */}
                <ProfileModal
                    modalOpen={modalProfileOpen}
                    setModalOpen={setModalProfileOpen}
                    profile={profile}
                />
            </div>

        </div>
    );
}

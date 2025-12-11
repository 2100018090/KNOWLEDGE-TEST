import React, { useState, useEffect } from "react";

export default function EditUserModal({ modalOpen, setModalOpen, userData, handleRefresh }) {
    const [form, setForm] = useState({
        username: "",
        password: "",
        nama: "",
        email: "",
        jenis_kelamin: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setForm({
                username: userData.username || "",
                password: "",
                nama: userData.nama || "",
                email: userData.email || "",
                jenis_kelamin: userData.jenis_kelamin || ""
            });
        }
    }, [userData]);

    if (!modalOpen) return null;

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/users/${userData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            alert("User berhasil diupdate!");
            setModalOpen(false);
            handleRefresh(); // refresh table
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setModalOpen(false)}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Kosongkan jika tidak ingin diganti"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nama</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.nama}
                                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Jenis Kelamin</label>
                            <select
                                className="form-select"
                                value={form.jenis_kelamin}
                                onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="pria">Pria</option>
                                <option value="wanita">Wanita</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                            Batal
                        </button>
                        <button className="btn btn-success" onClick={handleSave} disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

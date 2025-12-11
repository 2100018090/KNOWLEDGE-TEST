import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ProfileModal({ modalOpen, setModalOpen, profile, handleRefresh }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nama: "",
    email: "",
    jenis_kelamin: ""
  });
  const [loading, setLoading] = useState(false);

  // Set form saat modal dibuka
  useEffect(() => {
    if (modalOpen && profile) {
      setForm({
        username: profile.username || "",
        password: "", // kosongkan password
        nama: profile.nama || "",
        email: profile.email || "",
        jenis_kelamin: profile.jenis_kelamin || ""
      });
    }
  }, [modalOpen, profile]);

  if (!modalOpen || !profile) return null;

  const handleSave = async () => {
    // Validasi
    if (!form.nama || !form.email || !form.jenis_kelamin || !form.username) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Semua field harus diisi!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/users/${profile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Profile berhasil diupdate!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });

      setModalOpen(false);
      handleRefresh?.(); // optional refresh data di parent
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: err.message || "Gagal menyimpan profile",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
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
            <h5 className="modal-title">Edit Profile</h5>
            <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
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
                value={form.password}
                placeholder="Kosongkan jika tidak ingin diganti"
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
              Tutup
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

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import UserModal from "../../components/Admin/Modal/UserList/TambahModal";
import Swal from "sweetalert2";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: null, nama: "", email: "", jenis_kelamin: "", username: "", password: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ambil data user
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setForm({ id: null, nama: "", email: "", jenis_kelamin: "", username: "", password: "" });
    setIsEdit(false);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setForm({
      id: user._id,
      nama: user.nama,
      email: user.email,
      jenis_kelamin: user.jenis_kelamin,
      username: user.username || "",
      password: "" // kosongkan password
    });
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    // Validasi
    if (!form.nama || !form.email || !form.jenis_kelamin || (!isEdit && (!form.username || !form.password))) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Semua field harus diisi!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        // Edit user
        const res = await fetch(`http://localhost:5000/api/users/${form.id}`, {
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
          title: "User berhasil diupdate!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        // Tambah user
        const res = await fetch("http://localhost:5000/api/users/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "User berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }

      await fetchUsers();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: err.message || "Gagal menyimpan user",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah yakin ingin menghapus user ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        // Tampilkan notifikasi sukses di pojok kanan atas
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'User berhasil dihapus!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        await fetchUsers(); // refresh data
      } catch (err) {
        console.error(err);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: err.message || "Gagal menghapus user",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="fw-bold mb-4">Data User</h2>

      <div className="d-flex justify-content-end mb-3" style={{ marginRight: "50px" }}>
        <button className="btn btn-success" onClick={openAddModal}>
          Tambah User
        </button>
      </div>

      {/* Tabel */}
      <div className="card shadow-sm p-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Jenis Kelamin</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td>{user.jenis_kelamin}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(user)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-3">
                    Tidak ada data user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        form={form}
        setForm={setForm}
        isEdit={isEdit}
        handleSave={handleSave}
      />
    </AdminLayout>
  );
}

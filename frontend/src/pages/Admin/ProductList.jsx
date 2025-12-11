import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import ProductModal from "../../components/Admin/Modal/ProductList/ProductModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama: "",
    harga: "",
    kategori: "",
    pilihan: false,
    gambar: null,
  });
  const [showOnlyPilihan, setShowOnlyPilihan] = useState(false);
  const MySwal = withReactContent(Swal);

  const token = localStorage.getItem("token"); // optional, jika backend pakai auth

  // Fetch data produk
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Modal Tambah
  const openAddModal = () => {
    setForm({ id: null, nama: "", harga: "", kategori: "", pilihan: false, gambar: null });
    setIsEdit(false);
    setModalOpen(true);
  };

  // Modal Edit
  const openEditModal = (product) => {
    setForm({
      id: product._id,
      nama: product.nama,
      harga: product.harga,
      kategori: product.kategori,
      pilihan: product.pilihan,
      gambar: null,
    });
    setIsEdit(true);
    setModalOpen(true);
  };

  // Simpan Tambah/Edit
  const handleSave = async () => {
    if (!form.nama || !form.harga || !form.kategori) {
      return MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Lengkapi semua field!",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("harga", form.harga);
    formData.append("kategori", form.kategori);
    formData.append("pilihan", form.pilihan);
    if (form.gambar) formData.append("gambar", form.gambar);

    try {
      const url = isEdit
        ? `http://localhost:5000/api/products/${form.id}`
        : "http://localhost:5000/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal menyimpan data!");

      fetchProducts();
      setModalOpen(false);

      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Produk berhasil ${isEdit ? "diupdate" : "ditambahkan"}!`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Gagal menyimpan produk!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // Hapus produk
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah yakin ingin menghapus produk ini?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Gagal menghapus produk!");

      fetchProducts();

      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Produk berhasil dihapus!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Gagal menghapus produk!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };


  if (loading) {
    return (
      <AdminLayout>
        <h2 className="fw-bold mb-4">Data Produk</h2>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  // Data yang ditampilkan, bisa difilter pilihan
  const filteredProducts = showOnlyPilihan
    ? products.filter((p) => p.pilihan)
    : products;

  return (
    <AdminLayout>
      <h2 className="fw-bold mb-4">Data Produk</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={openAddModal}>
          Tambah Produk
        </button>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="filterPilihan"
            checked={showOnlyPilihan}
            onChange={(e) => setShowOnlyPilihan(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="filterPilihan">
            Tampilkan hanya produk pilihan
          </label>
        </div>
      </div>

      <div className="card shadow-sm p-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Kategori</th>
                <th>Pilihan</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.nama}</td>
                    <td>Rp {product.harga.toLocaleString()}</td>
                    <td>{product.kategori}</td>
                    <td>{product.pilihan ? "Ya" : "Tidak"}</td>
                    <td>
                      {product.gambar ? (
                        <img
                          src={`http://localhost:5000${product.gambar}`}
                          alt={product.nama}
                          style={{ width: "100px", height: "auto" }}
                        />
                      ) : (
                        "Tidak ada gambar"
                      )}
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(product)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    Tidak ada data produk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah/Edit */}
      <ProductModal
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

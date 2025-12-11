import React from "react";

export default function ProductModal({ modalOpen, setModalOpen, form, setForm, isEdit, handleSave }) {
  if (!modalOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit Produk" : "Tambah Produk"}</h5>
            <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
          </div>
          <div className="modal-body">
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
              <label className="form-label">Harga</label>
              <input
                type="number"
                className="form-control"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Kategori</label>
              <input
                type="text"
                className="form-control"
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pilihan</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={form.pilihan || false}
                  onChange={(e) => setForm({ ...form, pilihan: e.target.checked })}
                  id="pilihanCheck"
                />
                <label className="form-check-label" htmlFor="pilihanCheck">
                  Pilih Produk
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Gambar</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setForm({ ...form, gambar: e.target.files[0] })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {isEdit ? "Update" : "Tambah"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

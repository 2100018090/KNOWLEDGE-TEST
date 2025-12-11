import React, { useState, useEffect } from "react";

export default function UserModal({ modalOpen, setModalOpen, isEdit, form, setForm, handleSave }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Reset step saat modal ditutup
  useEffect(() => {
    if (!modalOpen) setStep(1);
  }, [modalOpen]);

  if (!modalOpen) return null;

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const onSave = async () => {
    setLoading(true);
    await handleSave();
    setLoading(false);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit User" : "Tambah User"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setModalOpen(false)}
            ></button>
          </div>

          <div className="modal-body">
            {/* Step 1: Username + Password */}
            {step === 1 && (
              <>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.username || ""}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password || ""}
                    placeholder={isEdit ? "Kosongkan jika tidak ingin diganti" : ""}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Step 2: Nama, Email, Jenis Kelamin */}
            {step === 2 && (
              <>
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.nama || ""}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    className="form-select"
                    value={form.jenis_kelamin || ""}
                    onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })}
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            {step === 2 && (
              <button className="btn btn-secondary" onClick={handleBack}>
                Kembali
              </button>
            )}
            {step === 1 && (
              <button className="btn btn-primary" onClick={handleNext}>
                Selanjutnya
              </button>
            )}
            {step === 2 && (
              <button className="btn btn-success" onClick={onSave} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

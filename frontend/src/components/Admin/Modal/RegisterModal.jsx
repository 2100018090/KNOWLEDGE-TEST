import React, { useState } from "react";

export default function RegisterModal({ modalOpen, setModalOpen, handleRegister }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    password: "",
    nama: "",
    email: "",
    jenisKelamin: "",
  });

  if (!modalOpen) return null;

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const submitForm = () => {
    handleRegister(form); // kirim data ke parent
    setStep(1);
    setForm({ username: "", password: "", nama: "", email: "", jenisKelamin: "" });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Register</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setModalOpen(false);
                setStep(1);
              }}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {step === 1 && (
              <>
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
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
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
                    value={form.jenisKelamin}
                    onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}
                  >
                    <option value="">Pilih</option>
                    <option value="pria">Laki-laki</option>
                    <option value="wanita">Perempuan</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            {step === 2 && (
              <button className="btn btn-secondary" onClick={prevStep}>
                Kembali
              </button>
            )}

            {step === 1 && (
              <button
                className="btn btn-primary"
                onClick={nextStep}
                disabled={!form.username || !form.password}
              >
                Lanjut
              </button>
            )}

            {step === 2 && (
              <button
                className="btn btn-success"
                onClick={() => {
                  submitForm();
                  setModalOpen(false);
                }}
                disabled={!form.nama || !form.email || !form.jenisKelamin}
              >
                Register
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

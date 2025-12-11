import React from "react";

export default function LoginModal({ modalOpen, setModalOpen, form, setForm, handleLogin }) {
  if (!modalOpen) return null; // jika modalClose maka tidak render apa-apa

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
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
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setModalOpen(false)}
            >
              Batal
            </button>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

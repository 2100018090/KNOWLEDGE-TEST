import React from "react";
import logo from "../../assets/img/7884399.jpg"; // pastikan path sesuai

export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-4 mt-5 border-top shadow-sm" id="kontak">
      <div className="container">

        <div className="row justify-content-between g-4">

          {/* Brand + Logo */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={logo}
                alt="Logo"
                width="55"
                height="55"
                className="rounded-circle shadow-sm"
                style={{ objectFit: "cover" }}
              />
              <h4 className="fw-bold ms-3 mb-0">My LandingPage</h4>
            </div>

            <p className="text-muted">
              Tempat terbaik untuk menemukan produk berkualitas tinggi dengan penawaran terbaik.
            </p>

            {/* Social Media */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-dark fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-dark fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-dark fs-4"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="col-md-3">
            <h5 className="fw-semibold mb-3 d-flex align-items-center">
              <i className="bi bi-menu-button-wide me-2"></i> Navigasi
            </h5>

            <ul className="list-unstyled footer-links">
              <li><a href="#hero" className="footer-link">Home</a></li>
              <li><a href="#product" className="footer-link">Produk</a></li>
              <li><a href="#kontak" className="footer-link">Kontak</a></li>
            </ul>
          </div>

          {/* Kontak + Map */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3 d-flex align-items-center">
              <i className="bi bi-geo-alt-fill me-2"></i> Kontak Kami
            </h5>

            <p className="mb-1"><i className="bi bi-telephone-fill me-2"></i> +62 812-3456-7890</p>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i> support@mylandingpage.com</p>
            <p className="mb-3"><i className="bi bi-geo-fill me-2"></i> Jakarta, Indonesia</p>

            {/* MAP */}
            <div className="rounded overflow-hidden shadow-sm border">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19835.648834845533!2d106.816635!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e7df1b9cfb%3A0x3ae334c06c14a2f!2sJakarta!5e0!3m2!1sid!2sid!4v1700000000000"
                width="100%"
                height="160"
                style={{ border: "0" }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Garis pemisah */}
        <hr className="my-4 border-secondary opacity-25" />

        {/* Footer Copyright */}
        <p className="text-center text-muted mb-0">
          © 2025 My LandingPage — All Rights Reserved
        </p>
      </div>

      {/* CSS Extra */}
      <style>
        {`
          .footer-link {
            color: #555;
            text-decoration: none;
            display: block;
            margin-bottom: 8px;
            transition: all 0.25s ease;
          }

          .footer-link:hover {
            color: #000;
            margin-left: 6px;
          }
        `}
      </style>
    </footer>
  );
}

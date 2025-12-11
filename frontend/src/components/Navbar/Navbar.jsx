import React, { useState } from "react";
import logo from "../../assets/img/7884399.jpg";
import '../../assets/css/style.css';
import { Link } from "react-router-dom";


export default function Navbar({ user, onLoginClick, onRegisterClick, onLogout }) {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 fixed-top">
                <Link
                    to="/"
                    className="navbar-brand fw-bold d-flex align-items-center ms-5"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        width="60"
                        height="60"
                        className="d-inline-block align-text-top me-2"
                    />
                    ShopWar
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="#hero">
                                Home
                            </a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="#product">
                                Produk
                            </a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="#kontak">
                                Kontak
                            </a>
                        </li>

                        {/* Tombol Login */}
                        <li className="nav-item mx-2">
                            <button
                                className="btn btn-outline-primary px-3"
                                onClick={onLoginClick} // menerima props dari Home.jsx
                            >
                                Login
                            </button>
                        </li>

                        {/* Tombol Register */}
                        <li className="nav-item mx-2">
                            <button className="btn btn-primary px-3" onClick={onRegisterClick}>
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

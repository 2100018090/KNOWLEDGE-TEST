import React from "react";

export default function ProductCardModern({ image, title, subtitle }) {
    return (
        <div className="card-modern">
            
            {/* Gambar */}
            <div className="card-img-wrapper">
                <img src={image} alt={title} className="card-modern-img" />

                {/* Overlay Hover */}
                <div className="card-overlay">
                    <div className="overlay-icon">
                        <i className="bi bi-camera fs-1"></i>
                        <p className="mt-2">Preview</p>
                    </div>
                </div>
            </div>

            {/* Text */}
            <div className="card-modern-body">
                <h5 className="card-modern-title">{title}</h5>
                <p className="card-modern-sub">{subtitle}</p>
            </div>

            {/* STYLE */}
            <style>
                {`
                    .card-modern {
                        background: white;
                        border-radius: 18px;
                        overflow: hidden;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                        transition: 0.25s ease;
                        cursor: pointer;
                        position: relative;
                    }

                    .card-modern:hover {
                        transform: translateY(-6px);
                        box-shadow: 0 12px 28px rgba(0,0,0,0.12);
                    }

                    .card-img-wrapper {
                        position: relative;
                        overflow: hidden;
                    }

                    .card-modern-img {
                        width: 100%;
                        height: 260px;
                        object-fit: cover;
                        transition: 0.3s ease;
                    }

                    .card-modern:hover .card-modern-img {
                        transform: scale(1.05);
                    }

                    /* Overlay */
                    .card-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.55);
                        opacity: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: 0.3s ease;
                    }

                    .card-modern:hover .card-overlay {
                        opacity: 1;
                    }

                    .overlay-icon {
                        text-align: center;
                        color: white;
                        animation: fadeIn 0.5s ease forwards;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .card-modern-body {
                        padding: 20px;
                    }

                    .card-modern-title {
                        font-size: 1.2rem;
                        font-weight: 700;
                        margin: 0;
                        color: #0b1b3b;
                        font-family: "Inter", sans-serif;
                    }

                    .card-modern-sub {
                        margin-top: 5px;
                        color: #6c757d;
                        font-size: 0.9rem;
                    }
                `}
            </style>

        </div>
    );
}

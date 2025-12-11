import React from "react";

export default function ProductCard({ name, price, image }) {
    return (
        <div
            className="card product-card shadow-sm border-0 h-100"
            style={{
                minHeight: "420px",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "0.3s",
            }}
        >
            {/* Gambar */}
            <div style={{ overflow: "hidden" }}>
                <img
                    src={image}
                    alt={name}
                    className="product-img card-img-top"
                    style={{
                        height: "220px",
                        width: "100%",
                        objectFit: "cover",
                        transition: "0.4s",
                    }}
                />
            </div>

            {/* Konten */}
            <div className="card-body d-flex flex-column text-center">
                <h5 className="fw-bold">{name}</h5>

                <p className="text-muted fs-5 mb-4">{price}</p>

                <button className="btn btn-primary w-100 py-2 fw-semibold mt-auto">
                    Detail Produk
                </button>
            </div>

            {/* Hover Effect */}
            <style>
                {`
                    .product-card:hover {
                        transform: translateY(-10px);
                        box-shadow: 0px 12px 25px rgba(0,0,0,0.15);
                    }

                    .product-card:hover .product-img {
                        transform: scale(1.08);
                    }
                `}
            </style>
        </div>
    );
}

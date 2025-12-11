import React, { useEffect, useState } from "react";
import ProductCardModern from "./ProductCardModern";

export default function ProductTop() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products/top");
                const data = await response.json();
                
                // Map data dari API ke format yang dibutuhkan ProductCardModern
                const mappedData = data.map(item => ({
                    image: `http://localhost:5000${item.gambar}`, // pastikan backend serve gambar
                    title: item.nama,
                    subtitle: item.kategori,
                }));

                setItems(mappedData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center py-5">Loading...</p>;

    return (
        <div className="container py-5 section-full" id="product">
            <h2
                className="text-center fw-bold"
                style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "2rem",
                    marginBottom: "90px"
                }}
            >
                Produk Pilihan
            </h2>

            <div className="row g-4 zigzag-grid pb-5">
                {items.map((item, i) => (
                    <div className="col-md-3 col-sm-6 zig-item" key={i}>
                        <ProductCardModern {...item} />
                    </div>
                ))}
            </div>

            <style>
                {`
                .section-full {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .zigzag-grid .zig-item:nth-child(1),
                .zigzag-grid .zig-item:nth-child(3) {
                    margin-top: -25px;
                }

                .zigzag-grid .zig-item:nth-child(2),
                .zigzag-grid .zig-item:nth-child(4) {
                    margin-top: 50px;
                }

                .zigzag-grid .zig-item:nth-child(1),
                .zigzag-grid .zig-item:nth-child(2) {
                    order: 1;
                }

                .zigzag-grid .zig-item:nth-child(3),
                .zigzag-grid .zig-item:nth-child(4) {
                    order: 2;
                }

                @media (max-width: 768px) {
                    .zigzag-grid .zig-item {
                        margin-top: 0 !important;
                        order: unset;
                    }
                }
                `}
            </style>
        </div>
    );
}

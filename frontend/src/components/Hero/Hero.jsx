import React, { useEffect, useState } from "react";

export default function Hero() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products/top");
                const data = await res.json();

                // hanya ambil path gambar
                const imgList = data.map((item) => `http://localhost:5000${item.gambar}`);

                setImages(imgList);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchTopProducts();
    }, []);

    return (
        <section
            className="bg-light d-flex align-items-center"
            style={{ minHeight: "100vh" }}
            id="hero"
        >
            <div className="container pt-0" style={{ marginTop: "30px" }}>
                <div className="row align-items-center">

                    {/* Kiri - Text */}
                    <div className="col-lg-6 text-start">
                        <h1 className="display-4 fw-bold">
                            Temukan Produk Terbaik <br />Untuk Kebutuhan Anda
                        </h1>

                        <p className="lead mt-3">
                            Dapatkan kualitas premium dengan harga terbaik hanya di sini.
                        </p>

                        <a href="#produk" className="btn btn-primary btn-lg mt-3">
                            Lihat Detail
                        </a>
                    </div>

                    {/* Kanan - Carousel */}
                    <div className="col-lg-6 text-center mt-4 mt-lg-0">
                        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner rounded shadow">

                                {/* Jika belum ada gambar */}
                                {images.length === 0 && (
                                    <div className="carousel-item active">
                                        <div className="p-5">Loading...</div>
                                    </div>
                                )}

                                {/* Render gambar dari API */}
                                {images.map((img, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        key={index}
                                    >
                                        <img
                                            src={img}
                                            className="d-block w-100"
                                            alt={`Produk ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Tombol sebelah kiri & kanan */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                            </button>

                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

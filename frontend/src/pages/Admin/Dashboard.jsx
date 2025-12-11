import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTotals, fetchLatestProducts, fetchTopProducts } from "../../components/services/methodService";

export default function Dashboard() {

    const { totalUsers, totalProducts } = useTotals();
    const [latestProducts, setLatestProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const latest = await fetchLatestProducts();
            const top = await fetchTopProducts();
            setLatestProducts(latest);
            setTopProducts(top);
        };

        loadProducts();
    }, []);

    return (
        <AdminLayout>

            <h2 className="fw-bold mb-4">Dashboard Overview</h2>

            {/* Cards */}
            <div className="row g-4">
                <div className="col-md-3">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-muted">Total Users</h6>
                        <h3 className="fw-bold">{totalUsers.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-muted">Total Products</h6>
                        <h3 className="fw-bold">{totalProducts.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-muted">Total Products Top</h6>
                        <h3 className="fw-bold">{totalProducts.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-muted">Product</h6>
                        <h3 className="fw-bold">{totalProducts.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            <div className="mt-5 row g-3">
                {/* Latest Products */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h5 className="fw-bold">Latest Products</h5>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Harga</th>
                                        <th>Kategori</th>
                                        <th>Gambar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.nama}</td>
                                            <td>{product.harga.toLocaleString()}</td>
                                            <td>{product.kategori}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:5000${product.gambar}`}
                                                    alt={product.nama}
                                                    width="50"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h5 className="fw-bold">Top Products</h5>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Harga</th>
                                        <th>Kategori</th>
                                        <th>Gambar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.nama}</td>
                                            <td>{product.harga.toLocaleString()}</td>
                                            <td>{product.kategori}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:5000${product.gambar}`}
                                                    alt={product.nama}
                                                    width="50"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </AdminLayout>
    );
}

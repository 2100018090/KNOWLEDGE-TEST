import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductTop from "../components/ProductCard/ProductTop";
import Footer from "../components/Footer/Footer";
import LoginModal from "../components/Admin/Modal/LoginModal";
import RegisterModal from "../components/Admin/Modal/RegisterModal";
import { login } from "../components/services/authService";
import { register } from "../components/services/authService";

export default function Home() {
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Ambil data user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch latest products dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/latest");
        const data = await response.json();

        const mappedData = data.map((item) => ({
          id: item._id,
          name: item.nama,
          price: `Rp ${item.harga.toLocaleString("id-ID")}`,
          image: `http://localhost:5000${item.gambar}`,
        }));

        setProducts(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogin = () => {
    login(loginForm, setUser, navigate, setModalLoginOpen, setLoginForm);
  };

  const handleRegister = (form) => {
    register(form, navigate, setModalRegisterOpen);
  };


  if (loading) return <p className="text-center py-5">Loading...</p>;

  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <>
      <Navbar
        user={user}
        onLoginClick={() => setModalLoginOpen(true)}
        onRegisterClick={() => setModalRegisterOpen(true)}
      />

      <Hero />

      {/* Section Produk Pilihan */}
      <ProductTop />

      {/* Produk Kami Section */}
      <section id="produk" className="py-5">
        <div className="container-fluid">
          <h2
            className="text-center mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
          >
            Produk Kami
          </h2>

          <div className="row g-4">
            {displayedProducts.map((item) => (
              <div className="col-md-4 col-sm-6" key={item.id}>
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>

          {products.length > 3 && (
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Tutup" : "Lihat Lainnya"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <LoginModal
        modalOpen={modalLoginOpen}
        setModalOpen={setModalLoginOpen}
        form={loginForm}
        setForm={setLoginForm}
        handleLogin={handleLogin}
      />

      <RegisterModal
        modalOpen={modalRegisterOpen}
        setModalOpen={setModalRegisterOpen}
        handleRegister={handleRegister}
      />


      <Footer />
    </>
  );
}

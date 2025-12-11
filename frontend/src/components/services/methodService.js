import { useState, useEffect } from "react";

export function useTotals() {
  const [totals, setTotals] = useState({
    totalUsers: 0,
    totalProducts: 0
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/totals");
        const data = await response.json();

        if (data.success) {
          setTotals({
            totalUsers: data.data.totalUsers,
            totalProducts: data.data.totalProducts
          });
        }
      } catch (error) {
        console.error("Gagal mengambil totals:", error);
      }
    };

    fetchTotals();
  }, []);

  return totals; // { totalUsers, totalProducts }
}
export function useProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data.data.user); // ambil bagian user
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return profile;
}

// services/product.service.js
export const fetchLatestProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products/latest");
    const data = await res.json();
    return data; // kembalikan array produk
  } catch (error) {
    console.error("Gagal mengambil latest products:", error);
    return []; // fallback kosong
  }
};

export const fetchTopProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products/top");
    const data = await res.json();
    return data; // kembalikan array produk
  } catch (error) {
    console.error("Gagal mengambil top products:", error);
    return []; // fallback kosong
  }
};

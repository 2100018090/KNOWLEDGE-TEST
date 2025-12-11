// src/services/authService.js
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/**
 * Fungsi login
 * @param {object} loginForm - { username, password }
 * @param {function} setUser - fungsi setState user
 * @param {function} navigate - fungsi navigate dari react-router-dom
 * @param {function} setModalLoginOpen - untuk menutup modal login (opsional)
 * @param {function} setLoginForm - reset form
 */
export const login = async (loginForm, setUser, navigate, setModalLoginOpen, setLoginForm) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    const data = await response.json();

    if (response.ok) {
      // Simpan user & token
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Reset form & tutup modal
      if (setModalLoginOpen) setModalLoginOpen(false);
      if (setLoginForm) setLoginForm({ username: "", password: "" });

      // Redirect
      navigate("/admin/dashboard");

      // Notifikasi sukses login
      setTimeout(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil login",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }, 0);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: data.message || "Login gagal",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Terjadi kesalahan saat login",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });
  }
};

/**
 * Fungsi logout
 * @param {function} setUser - fungsi setState user
 * @param {function} navigate - fungsi navigate dari react-router-dom
 */
export const logout = async (setUser, navigate) => {
  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    // Redirect ke home
    navigate("/");

    // Notifikasi sukses logout
    setTimeout(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil logout",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    }, 0);
  } catch (error) {
    console.error("Logout gagal:", error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Gagal logout",
      text: "Silahkan coba lagi.",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });
  }
};

export const register = async (form, navigate, setModalRegisterOpen) => {
  try {
    const payload = {
      nama: form.nama,
      email: form.email,
      jenis_kelamin: form.jenisKelamin, // <-- WAJIB INI!
      username: form.username,
      password: form.password,
    };

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: data.message || "Register gagal",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      return;
    }

    // ----- AUTO LOGIN -----
    const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login otomatis gagal",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      return;
    }

    localStorage.setItem("user", JSON.stringify(loginData.user));
    localStorage.setItem("token", loginData.token);

    if (setModalRegisterOpen) setModalRegisterOpen(false);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Register berhasil, selamat datang!",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    }).then(() => {
      navigate("/admin/dashboard");
    });

  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Terjadi kesalahan.",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });
  }
};




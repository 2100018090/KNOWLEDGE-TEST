import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Admin/Dashboard";
import UserList from "./pages/Admin/UserList";
import ProductList from "./pages/Admin/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null); // state user login

  return (
    <Router>
      <Routes>
        {/* Halaman publik */}
        <Route path="/" element={<Home setUser={setUser} />} />

        {/* Halaman admin hanya untuk user login */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute user={user}>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute user={user}>
              <ProductList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

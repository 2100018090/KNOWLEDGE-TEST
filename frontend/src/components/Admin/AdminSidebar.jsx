import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <div
            className="d-flex flex-column bg-dark text-white p-3"
            style={{ width: "260px", minHeight: "100vh" }}
        >
            <h3 className="fw-bold mb-4">Admin Panel</h3>

            <ul className="nav flex-column gap-2">
                <li>
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            "nav-link px-3 py-2 rounded mb-1 d-flex align-items-center text-white transition-colors duration-300" +
                            (isActive ? " bg-gray-700" : " hover:bg-gray-600")
                        }
                    >
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            "nav-link px-3 py-2 rounded mb-1 d-flex align-items-center text-white transition-colors duration-300" +
                            (isActive ? " bg-gray-700" : " hover:bg-gray-600")
                        }
                    >
                        <i className="bi bi-people me-2"></i> Users
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/product" className="nav-link text-white">
                        <i className="bi bi-box-seam me-2"></i> Products
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

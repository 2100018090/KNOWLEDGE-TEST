
export default function AdminNavbar({ user, onLogout, onProfileClick }) {

    return (
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
            <span className="navbar-brand fw-bold">Dashboard</span>

            <div className="ms-auto d-flex align-items-center gap-3">
                <i className="bi bi-bell fs-5"></i>

                <div className="dropdown">
                    <button
                        className="btn btn-light dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        Admin
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onProfileClick(); // buka modal profile
                                }}
                            >
                                Profile
                            </a>
                        </li>

                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <a className="dropdown-item" href="#" onClick={onLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

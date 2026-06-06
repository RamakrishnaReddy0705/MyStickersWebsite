import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation,useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import { useState, useEffect, useRef } from "react"; 
import { toast } from "react-toastify";

const Header = () => {
  

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  const userMenuRef = useRef(null);      
  const location = useLocation();          
  const navigate=useNavigate();
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
    setAdminMenuOpen(false);
  };


  const toggleAdminMenu = () =>
    setAdminMenuOpen((prev) => !prev);

  const { totalQuantity } = useCart();
  const { isAuthenticated,logout,user} = useAuth();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
   
  const handleLogOut=(e)=>{
   e.preventDefault();
   logout();
   toast.success("Logged out successfully");
   navigate("/home");
  }
  const navLinkClass =
    "text-center fs-5 fw-semibold py-2 text-primary text-decoration-none";

  // ✅ useEffect from reference
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // close menus on route change
    setUserMenuOpen(false);
    setAdminMenuOpen(false);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]); // ✅ reacts to navigation

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Brand */}
        <Link to="/" className="link d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faTags} className="fa-icon" />
          <span className="brand-title">MyStickers</span>
        </Link>

        {/* Navigation */}
        <nav className="eazynav">
          <ul className="d-flex align-items-center gap-4 list-unstyled mb-0">

            <li><Link to="/home" className={navLinkClass}>Home</Link></li>
            <li><Link to="/about" className={navLinkClass}>About</Link></li>
            <li><Link to="/contact" className={navLinkClass}>Contact</Link></li>

            {/* AUTH MENU */}
            <li className="position-relative" ref={userMenuRef}> {/* ✅ ref added */}

              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={toggleUserMenu}
                    className="btn btn-link text-primary p-0 d-flex align-items-center gap-1"
                  >
                    <span className="fw-semibold">{`Hello ${user.name.length>5?`${user.name.slice(0,5)}...`:user.name}`}</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </button>

                  {isUserMenuOpen && (
                    <ul className="dropdown-menu show position-absolute end-0 mt-2">

                      <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link to="/orders" className="dropdown-item">
                          Orders
                        </Link>
                      </li>

                      {isAdmin && (
                        <li className="position-relative">
                          <button
                            type="button"
                            onClick={toggleAdminMenu}
                            className="dropdown-item d-flex justify-content-between align-items-center"
                          >
                            Admin
                            <FontAwesomeIcon icon={faAngleDown} />
                          </button>

                          {isAdminMenuOpen && (
                            <ul className="dropdown-menu show position-absolute start-100 top-0 ms-1">
                              <li>
                                <Link to="/admin/orders" className="dropdown-item">
                                  Orders
                                </Link>
                              </li>
                              <li>
                                <Link to="/admin/messages" className="dropdown-item">
                                  Messages
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      )}

                      <li><hr className="dropdown-divider" /></li>

                      <li>
                        <Link to="/home" onClick={handleLogOut} className="dropdown-item">
                          Logout
                        </Link>
                      </li>

                    </ul>
                  )}
                </>
              ) : (
                <Link to="/login" className={navLinkClass}>
                  Login
                </Link>
              )}
            </li>

            {/* CART */}
            <li>
              <Link
                to="/cart"
                className="position-relative text-primary py-2"
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark fw-semibold rounded-pill px-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  {totalQuantity}
                </span>
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

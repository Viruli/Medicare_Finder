import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { getCurrentUser, logout } from "../../services/authService";

const Header = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar className={styles.navbarCustom} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.navBrand}>
          <img
            src="/header-logo.png"
            alt="MediCare Finder"
            className={styles.logo}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/medicines" className={styles.navLink}>
              Medicines
            </Nav.Link>

            <Nav.Link as={Link} to="/pharmacies" className={styles.navLink}>
              Pharmacies
            </Nav.Link>

            {user && user.role === "ADMIN" && (
              <Nav.Link as={Link} to="/pharmacy" className={styles.navLink}>
                Register Pharmacy
              </Nav.Link>
            )}

            {user ? (
              <Nav.Link onClick={handleLogout} className={styles.navLink}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className={styles.navLink}>
                Admin Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

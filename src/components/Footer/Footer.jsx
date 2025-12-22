import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="gy-4">

          <Col md={6}>
            <div className={styles.logoBox}>
              <img
                src="/header-logo.png"
                alt="MediCare Finder Logo"
                className={styles.logo}
              />
            </div>

            <p className={styles.text}>
              Find medicines easily from nearby pharmacies.
              Fast, reliable, and accurate information.
            </p>
          </Col>

          <Col md={3}>
            <h6 className={styles.heading}>Quick Links</h6>
            <ul className={styles.linkList}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/medicines">Medicines</Link></li>
              <li><Link to="/pharmacies">Pharmacies</Link></li>
              <li><Link to="/pharmacy">Register Pharmacy</Link></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className={styles.heading}>Contact</h6>
            <p className={styles.text}>📍 Sri Lanka</p>
            <p className={styles.text}>📧 support@medicarefinder.com</p>
            <p className={styles.text}>📞 +94 77 123 4567</p>
          </Col>

        </Row>

        <hr className={styles.divider} />

        <p className={styles.copy}>
          © {new Date().getFullYear()} MediCare Finder. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

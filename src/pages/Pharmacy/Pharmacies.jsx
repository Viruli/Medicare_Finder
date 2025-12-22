import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Pharmacies.module.css';

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [openOnly, setOpenOnly] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pharmacies');
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error.message);
      }
    };

    fetchPharmacies();
  }, []);

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesName = pharmacy.pharmacyName
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesCity = pharmacy.city
      .toLowerCase()
      .includes(searchCity.toLowerCase());

    const matchesOpen = openOnly ? pharmacy.openStatus === true : true;

    return matchesName && matchesCity && matchesOpen;
  });

  return (
    <Container className={styles.pageContainer}>
      <Row>
        <Col>
          <h1 className={styles.title}>Available Pharmacies</h1>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                placeholder="Search by Pharmacy Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Control
                placeholder="Search by City"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </Col>

            <Col md={4} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Open Now"
                checked={openOnly}
                onChange={(e) => setOpenOnly(e.target.checked)}
              />
            </Col>
          </Row>

          <Table bordered hover responsive className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Logo</th>
                <th>Pharmacy Name</th>
                <th>City</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Open Hours</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredPharmacies.map((pharmacy) => (
                <tr
                  key={pharmacy.id}
                  className={styles.tableRow}
                  onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
                >
                <td><img src={`http://localhost:8080/${pharmacy.logoUrl}`} alt={pharmacy.pharmacyName} width="50"/></td>
                  <td>{pharmacy.pharmacyName}</td>
                  <td>{pharmacy.city}</td>
                  <td>{pharmacy.phone}</td>
                  <td>{pharmacy.email}</td>
                  <td>
                    {pharmacy.openTime} - {pharmacy.closeTime}
                  </td>
                  <td>
                    {pharmacy.openStatus ? (
                      <Badge bg="success">Open</Badge>
                    ) : (
                      <Badge bg="danger">Closed</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredPharmacies.length === 0 && (
            <p className="text-center text-muted mt-4">
              No pharmacies found
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Pharmacies;

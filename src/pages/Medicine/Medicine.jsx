import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Pagination } from "react-bootstrap";
import { getAllMedicines } from "../../services/medicineService";
import styles from "./Medicine.module.css";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    pharmacyName: "",
    city: "",
    isOpen: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getAllMedicines();
        setMedicines(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMedicines();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  };

  const filteredMedicines = Array.isArray(medicines)
    ? medicines.filter((med) => {
        return (
          med.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
          med.brand?.toLowerCase().includes(filters.brand.toLowerCase()) &&
          med.pharmacy?.pharmacyName
            ?.toLowerCase()
            .includes(filters.pharmacyName.toLowerCase()) &&
          med.pharmacy?.city
            ?.toLowerCase()
            .includes(filters.city.toLowerCase()) &&
          (filters.isOpen === ""
            ? true
            : med.pharmacy?.openStatus === (filters.isOpen === "true"))
        );
      })
    : [];

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Container className="my-4">
      <Row>
        <Col md={3}>
          <h4>Filters</h4>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Pharmacy Name</Form.Label>
              <Form.Control
                type="text"
                name="pharmacyName"
                value={filters.pharmacyName}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="isOpen"
                value={filters.isOpen}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>

        <Col md={9}>
          <Row>
            {paginatedMedicines.map((med) => (
              <Col md={4} key={med.id} className="mb-4">
                <Card className={styles.card}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080${med.imageUrl}`}
                    className={styles.cardImage}
                  />
                  <Card.Body>
                    <Card.Title>{med.name}</Card.Title>
                    <Card.Text>
                      Brand: {med.brand} <br />
                      Pharmacy: {med.pharmacy.pharmacyName} <br />
                      City: {med.pharmacy.city} <br />
                      Status: {med.pharmacy.openStatus ? "Open" : "Closed"} <br />
                      Price: LKR{med.unitPrice.toFixed(2)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Medicine;

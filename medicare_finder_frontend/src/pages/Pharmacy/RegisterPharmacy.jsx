import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import styles from "./RegisterPharmacy.module.css";
import { useNavigate } from "react-router-dom";

const RegisterPharmacy = () => {
  const [formData, setFormData] = useState({
    pharmacyName: "",
    city: "",
    email: "",
    phone: "",
    logoUrl: null,
    password: "",
    openTime: "",
    closeTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("pharmacyName", formData.pharmacyName);
    data.append("city", formData.city);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    data.append("openTime", formData.openTime);
    data.append("closeTime", formData.closeTime);
    data.append("logo", formData.logoUrl);

    const response = await fetch("http://localhost:8080/api/pharmacy", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Failed to register pharmacy");
    }

    const result = await response.json();
    console.log("Pharmacy Registered:", result);

    alert("Pharmacy registered successfully!");
    navigate("/");

  } catch (error) {
    console.error("Error Registering Pharmacy:", error.message);
    alert("Failed to register pharmacy");
  }
};


  return (
    <Container className={styles.centerForm}>
      <h2 className="mb-4">Register a New Pharmacy</h2>

      <Form className={styles.formBox} onSubmit={handleSubmit}>
        <Form.Control
          className={styles.formControl}
          type="text"
          name="pharmacyName"
          placeholder="Pharmacy Name"
          value={formData.pharmacyName}
          onChange={handleInputChange}
          required
        />

        <Form.Control
          className={styles.formControl}
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          required
        />

        <Form.Control
          className={styles.formControl}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <Form.Control
          className={styles.formControl}
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />

        <Form.Control
          className={styles.formControl}
          type="file"
          name="logoUrl"
          accept="image/*"
          onChange={handleInputChange}
        />

        <Form.Control
          className={styles.formControl}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <Form.Label>Opening Time</Form.Label>
        <Form.Control
          className={styles.formControl}
          type="time"
          name="openTime"
          value={formData.openTime}
          onChange={handleInputChange}
          required
        />

        <Form.Label>Closing Time</Form.Label>
        <Form.Control
          className={styles.formControl}
          type="time"
          name="closeTime"
          value={formData.closeTime}
          onChange={handleInputChange}
          required
        />

        <Button type="submit" className={styles.submitButton}>
          Register Pharmacy
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPharmacy;

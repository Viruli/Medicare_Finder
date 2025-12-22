import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updatePharmacy } from "../../services/pharmacyService";

const UpdatePharmacyModal = ({ show, handleClose, pharmacy, refresh }) => {
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

  useEffect(() => {
    if (pharmacy) {
      setFormData({
        pharmacyName: pharmacy.pharmacyName,
        city: pharmacy.city,
        email: pharmacy.email,
        phone: pharmacy.phone,
        password: pharmacy.password,
        openTime: pharmacy.openTime,
        closeTime: pharmacy.closeTime,
        logoUrl: null,
      });
    }
  }, [pharmacy]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

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

      if (formData.logoUrl) {
        data.append("logoUrl", formData.logoUrl);
      }

      await updatePharmacy(pharmacy.id, data);
      refresh();
      handleClose();
      alert("Pharmacy updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update pharmacy");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Pharmacy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Pharmacy</Form.Label>
          <Form.Control
            name="pharmacyName"
            value={formData.pharmacyName}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Label>Pharmacy Logo</Form.Label>
          <Form.Control
            name="logoUrl"
            type="file"
            onChange={handleInputChange}
            accept="image/*"
            className="mb-2"
          />
          <Form.Label>Open Time</Form.Label>
          <Form.Control
            name="openTime"
            type="time"
            value={formData.openTime}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Form.Label>Close Time</Form.Label>
          <Form.Control
            name="closeTime"
            type="time"
            value={formData.closeTime}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePharmacyModal;

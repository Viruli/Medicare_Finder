import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updateMedicine } from "../../services/medicineService";

const UpdateMedicineModal = ({ show, handleClose, medicine, refresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    unitPrice: "",
    quantity: "",
    image: null,
  });

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name,
        brand: medicine.brand,
        unitPrice: medicine.unitPrice,
        quantity: medicine.quantity,
        image: null,
      });
    }
  }, [medicine]);

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
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });
      await updateMedicine(medicine.id, data);
      refresh();
      handleClose();
      alert("Medicine updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update medicine");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton><Modal.Title>Update Medicine</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control name="name" value={formData.name} onChange={handleInputChange} className="mb-2" />
          <Form.Control name="brand" value={formData.brand} onChange={handleInputChange} className="mb-2" />
          <Form.Control name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} className="mb-2" />
          <Form.Control name="quantity" value={formData.quantity} onChange={handleInputChange} className="mb-2" />
          <Form.Control type="file" name="image" onChange={handleInputChange} className="mb-2" />
          <Button type="submit">Update Medicine</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateMedicineModal;

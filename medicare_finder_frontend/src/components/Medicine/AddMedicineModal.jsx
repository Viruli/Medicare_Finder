import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { addMedicine } from "../../services/medicineService";

const AddMedicineModal = ({ show, onClose, pharmacyId, refresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    unitPrice: "",
    quantity: "",
    imageFile: null
  });

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
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("unitPrice", formData.unitPrice);
      data.append("quantity", formData.quantity);
      data.append("image", formData.imageUrl);

      await addMedicine(pharmacyId, data);
      refresh();
      onClose();
      
      setFormData({
      name: "",
      brand: "",
      unitPrice: "",
      quantity: "",
      imageUrl: null,
    });
    
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Medicine Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-2"
            required
          />
          <Form.Control
            type="text"
            placeholder="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="mb-2"
            required
          />
          <Form.Control
            type="number"
            placeholder="Unit Price"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleInputChange}
            className="mb-2"
            required
          />
          <Form.Control
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mb-2"
            required
          />
          <Form.Control
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleInputChange}
            className="mb-2"
            required
          />
          <Button type="submit" className="w-100 mt-2">Add Medicine</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMedicineModal;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import AddMedicineModal from "../../components/Medicine/AddMedicineModal";
import UpdateMedicineModal from "../../components/Medicine/UpdateMedicineModal";
import UpdatePharmacyModal from "../../components/Pharmacy/UpdatePharmacyModal";
import { getCurrentUser } from "../../services/authService";
import { getMedicinesByPharmacy, deleteMedicine } from "../../services/medicineService";
import { updatePharmacyStatus } from "../../services/pharmacyService";
import styles from "./PharmacyProfile.module.css";

const PharmacyProfile = () => {
  const { id } = useParams();
  const user = getCurrentUser();
  const isAdmin = user?.email === "admin@medicare.com";

  const [pharmacy, setPharmacy] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const [showUpdateMedicineModal, setShowUpdateMedicineModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showUpdatePharmacyModal, setShowUpdatePharmacyModal] = useState(false);

  const loadPharmacy = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/pharmacy/${id}`);
      if (!res.ok) throw new Error("Failed to fetch pharmacy");
      const data = await res.json();
      setPharmacy(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (type) => {
    try {
      if (type === "OPEN") await updatePharmacyStatus(id, true, false);
      else if (type === "CLOSE") await updatePharmacyStatus(id, false, true);
      else await updatePharmacyStatus(id, false, false);
      await loadPharmacy();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const loadMedicines = async () => {
    try {
      const data = await getMedicinesByPharmacy(id);
      setMedicines(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPharmacy();
    loadMedicines();
  }, [id]);

  const handleDeleteMedicine = async (medicineId) => {
    if (!window.confirm("Are you sure to delete this medicine?")) return;
    await deleteMedicine(medicineId);
    loadMedicines();
  };

  return (
    <Container className={styles.container}>
      {pharmacy && (
        <>
          <div className={styles.header}>

  {pharmacy.logoUrl && (
    <img
      src={`http://localhost:8080/${pharmacy.logoUrl}`}
      alt={pharmacy.pharmacyName}
      className={styles.pharmacyLogo}
    />
  )}

  {/* Pharmacy Info */}
  <div className={styles.headerInfo}>
    <h2>{pharmacy.pharmacyName}</h2>
    <p className={styles.city}>{pharmacy.city}</p>
    <p className={styles.contact}>
      📧 {pharmacy.email} | 📞 {pharmacy.phone}
    </p>
    <span
      className={`${styles.statusBadge} ${
        pharmacy.openStatus ? styles.open : styles.closed
      }`}
    >
      {pharmacy.openStatus ? "Open Now" : "Closed"}
    </span>
  </div>

  {/* Actions */}
  {isAdmin && (
    <div className={styles.actions}>
      <Button
        variant="warning"
        className={styles.updatePharmacyBtn}
        onClick={() => setShowUpdatePharmacyModal(true)}
      >
        ✏️ Edit
      </Button>

      <div className={styles.adminStatusControls}>
        <Button
          size="sm"
          variant="outline-success"
          onClick={() => updateStatus("OPEN")}
        >
          Force Open
        </Button>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => updateStatus("CLOSE")}
        >
          Force Close
        </Button>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => updateStatus("AUTO")}
        >
          Auto
        </Button>
      </div>
    </div>
  )}
</div>


          <div className={styles.medicineHeader}>
            <h3>Medicines</h3>
            {isAdmin && (
              <Button
                variant="success"
                onClick={() => setShowAddMedicineModal(true)}
              >
                Add Medicine
              </Button>
            )}
          </div>

          <div className={styles.medicineGrid}>
            {medicines.map((med) => (
              <div key={med.id} className={styles.medicineCard}>
                <img
                  src={`http://localhost:8080${med.imageUrl}`}
                  alt={med.name}
                  className={styles.medicineImage}
                />
                <h5>{med.name}</h5>
                <p>{med.brand}</p>
                <p>Unit Price: LKR {med.unitPrice}/=</p>
                <p>Quantity: {med.quantity} Packs</p>
                {isAdmin && (
                  <div className={styles.cardActions}>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setSelectedMedicine(med);
                        setShowUpdateMedicineModal(true);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteMedicine(med.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <AddMedicineModal
            show={showAddMedicineModal}
            onClose={() => setShowAddMedicineModal(false)}
            pharmacyId={id}
            refresh={loadMedicines}
          />
          {selectedMedicine && (
            <UpdateMedicineModal
              show={showUpdateMedicineModal}
              handleClose={() => setShowUpdateMedicineModal(false)}
              pharmacyId={id}
              medicine={selectedMedicine}
              refresh={loadMedicines}
            />
          )}
          <UpdatePharmacyModal
            show={showUpdatePharmacyModal}
            handleClose={() => setShowUpdatePharmacyModal(false)}
            pharmacy={pharmacy}
            refresh={loadPharmacy}
          />
        </>
      )}
    </Container>
  );
};

export default PharmacyProfile;

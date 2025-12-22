const API_URL = "http://localhost:8080/api/medicines";

export const getMedicinesByPharmacy = async (pharmacyId) => {
  const res = await fetch(`${API_URL}/pharmacy/${pharmacyId}`);
  return res.json();
};

export const addMedicine = async (pharmacyId, formData) => {
  const res = await fetch(`${API_URL}/pharmacy/${pharmacyId}`, {
    method: "POST",
    body: formData, 
  });
  if (!res.ok) throw new Error("Failed to add medicine");
  return res.json();
};

export const deleteMedicine = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const getAllMedicines = async () => {
  const res = await fetch(`${API_URL}`);
  return res.json();
};

export const updateMedicine = async (id, formData) => {
  const res = await fetch(`http://localhost:8080/api/medicines/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update medicine");
  return res.json();
};


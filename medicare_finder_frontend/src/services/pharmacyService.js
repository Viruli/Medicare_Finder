const API_URL = "http://localhost:8080/api/pharmacy";

export const updatePharmacy = async (id, formData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData, // FormData includes file
  });

  if (!res.ok) {
    throw new Error("Failed to update pharmacy");
  }

  return res.json();
};

export const updatePharmacyStatus = async (id, manualOpen, manualClosed) => {
  const res = await fetch(
    `${API_URL}/${id}/status?manualOpen=${manualOpen}&manualClosed=${manualClosed}`,
    { method: "PUT" }
  );

  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
};

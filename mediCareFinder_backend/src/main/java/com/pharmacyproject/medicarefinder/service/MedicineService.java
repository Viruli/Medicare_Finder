package com.pharmacyproject.medicarefinder.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pharmacyproject.medicarefinder.entity.Medicine;
import com.pharmacyproject.medicarefinder.entity.Pharmacy;
import com.pharmacyproject.medicarefinder.repository.MedicineRepository;
import com.pharmacyproject.medicarefinder.repository.PharmacyRepository;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final PharmacyRepository pharmacyRepository;

    public MedicineService(MedicineRepository medicineRepository, PharmacyRepository pharmacyRepository) {
        this.medicineRepository = medicineRepository;
        this.pharmacyRepository = pharmacyRepository;
    }

    public Medicine addMedicine(Long pharmacyId, String name, String brand, Double unitPrice, Integer quantity, MultipartFile image) throws IOException {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId).orElseThrow();

        String imageUrl = saveImage(image);

        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setBrand(brand);
        medicine.setUnitPrice(unitPrice);
        medicine.setQuantity(quantity);
        medicine.setImageUrl(imageUrl);
        medicine.setPharmacy(pharmacy);

        return medicineRepository.save(medicine);
    }

    public List<Medicine> getMedicinesByPharmacy(Long pharmacyId) {
        return medicineRepository.findByPharmacyId(pharmacyId);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine updateMedicine(
            Long id,
            String name,
            String brand,
            double unitPrice,
            int quantity,
            MultipartFile image
    ) throws IOException {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setName(name);
        medicine.setBrand(brand);
        medicine.setUnitPrice(unitPrice);
        medicine.setQuantity(quantity);

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            medicine.setImageUrl(imageUrl);
        }

        return medicineRepository.save(medicine);
    }

    private String saveImage(MultipartFile image) throws IOException {
        String uploadDir = "uploads/medicines/";
        Path path = Paths.get(uploadDir);
        Files.createDirectories(path);

        String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path imagePath = path.resolve(imageName);
        Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/medicines/" + imageName;
    }
}

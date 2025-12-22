package com.pharmacyproject.medicarefinder.controller;

import com.pharmacyproject.medicarefinder.entity.Medicine;
import com.pharmacyproject.medicarefinder.service.MedicineService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin("*")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @PostMapping(value = "/pharmacy/{pharmacyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Medicine> addMedicine(
            @PathVariable Long pharmacyId,
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam Double unitPrice,
            @RequestParam Integer quantity,
            @RequestParam MultipartFile image
    ) {
        try {
            Medicine saved = medicineService.addMedicine(pharmacyId, name, brand, unitPrice, quantity, image);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/pharmacy/{pharmacyId}")
    public List<Medicine> getMedicinesByPharmacy(@PathVariable Long pharmacyId) {
        return medicineService.getMedicinesByPharmacy(pharmacyId);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Medicine> updateMedicine(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam double unitPrice,
            @RequestParam int quantity,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Medicine updated = medicineService.updateMedicine(id, name, brand, unitPrice, quantity, image);
            return ResponseEntity.ok(updated);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

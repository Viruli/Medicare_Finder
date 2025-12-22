package com.pharmacyproject.medicarefinder.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pharmacyproject.medicarefinder.entity.Pharmacy;
import com.pharmacyproject.medicarefinder.service.PharmacyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PharmacyController {

    private final PharmacyService pharmacyService;

    @PostMapping("/pharmacy")
    public ResponseEntity<Pharmacy> registerPharmacy(
            @RequestParam String pharmacyName,
            @RequestParam String city,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String password,
            @RequestParam String openTime,
            @RequestParam String closeTime,
            @RequestParam MultipartFile logo
    ) throws IOException {

        Pharmacy savedPharmacy = pharmacyService.registerPharmacy(
                pharmacyName, city, email, phone, password, openTime, closeTime, logo
        );

        return ResponseEntity.ok(savedPharmacy);
    }

    @PutMapping("/pharmacy/{id}")
    public ResponseEntity<Pharmacy> updatePharmacy(
            @PathVariable Long id,
            @RequestParam String pharmacyName,
            @RequestParam String city,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam(value = "logoUrl", required = false) MultipartFile logo,
            @RequestParam String openTime,
            @RequestParam String closeTime
    ) throws IOException {

        Pharmacy updatedPharmacy = pharmacyService.updatePharmacy(
                id, pharmacyName, city, email, phone, logo, openTime, closeTime
        );

        return ResponseEntity.ok(updatedPharmacy);
    }

    @GetMapping("/pharmacies")
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    @GetMapping("/pharmacy/{id}")
    public ResponseEntity<?> getPharmacyById(@PathVariable Long id) {
        Pharmacy pharmacy = pharmacyService.getPharmacyById(id);
        if (pharmacy == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(pharmacy);
    }

    @PutMapping("/pharmacy/{id}/status")
    public ResponseEntity<Pharmacy> updateStatus(
            @PathVariable Long id,
            @RequestParam boolean manualOpen,
            @RequestParam boolean manualClosed
    ) {
        Pharmacy updated = pharmacyService.updatePharmacyStatus(id, manualOpen, manualClosed);
        return ResponseEntity.ok(updated);
    }
}

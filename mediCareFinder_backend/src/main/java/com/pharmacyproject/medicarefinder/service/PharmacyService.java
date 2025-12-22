package com.pharmacyproject.medicarefinder.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pharmacyproject.medicarefinder.entity.Pharmacy;
import com.pharmacyproject.medicarefinder.repository.PharmacyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public Pharmacy registerPharmacy(
            String pharmacyName,
            String city,
            String email,
            String phone,
            String password,
            String openTime,
            String closeTime,
            MultipartFile logo
    ) throws IOException {

        String logoUrl = null;
        if (logo != null && !logo.isEmpty()) {
            logoUrl = savePharmacyLogo(logo);
        }

        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setPharmacyName(pharmacyName);
        pharmacy.setCity(city);
        pharmacy.setEmail(email);
        pharmacy.setPhone(phone);
        pharmacy.setPassword(password);
        pharmacy.setOpenTime(LocalTime.parse(openTime));
        pharmacy.setCloseTime(LocalTime.parse(closeTime));
        pharmacy.setLogoUrl(logoUrl);

        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy updatePharmacy(
            Long id,
            String pharmacyName,
            String city,
            String email,
            String phone,
            MultipartFile logo,
            String openTime,
            String closeTime
    ) throws IOException {

        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        pharmacy.setPharmacyName(pharmacyName);
        pharmacy.setCity(city);
        pharmacy.setEmail(email);
        pharmacy.setPhone(phone);
        pharmacy.setOpenTime(LocalTime.parse(openTime));
        pharmacy.setCloseTime(LocalTime.parse(closeTime));

        if (logo != null && !logo.isEmpty()) {
            String logoUrl = savePharmacyLogo(logo);
            pharmacy.setLogoUrl(logoUrl);
        }

        return pharmacyRepository.save(pharmacy);
    }

    private String savePharmacyLogo(MultipartFile logo) throws IOException {
        String uploadDir = new File("uploads").getAbsolutePath();
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + logo.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        Files.createDirectories(path.getParent());
        logo.transferTo(path.toFile());

        return "uploads/" + fileName;
    }

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    public Pharmacy getPharmacyById(Long id) {
        return pharmacyRepository.findById(id).orElse(null);
    }

    public Pharmacy updatePharmacyStatus(Long id, boolean manualOpen, boolean manualClosed) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        pharmacy.setManualOpen(manualOpen);
        pharmacy.setManualClosed(manualClosed);

        return pharmacyRepository.save(pharmacy);
    }
}

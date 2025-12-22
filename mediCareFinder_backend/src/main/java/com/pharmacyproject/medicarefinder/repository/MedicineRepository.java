package com.pharmacyproject.medicarefinder.repository;

import com.pharmacyproject.medicarefinder.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByPharmacyId(Long pharmacyId);
}


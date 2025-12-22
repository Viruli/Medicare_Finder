package com.pharmacyproject.medicarefinder.entity;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Data
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pharmacyName;
    private String city;
    private String email;
    private String phone;

    private String logoUrl;
    private String password;

    private LocalTime openTime;
    private LocalTime closeTime;

    @Column(nullable = false)
    private boolean manualOpen = false;

    @Column(nullable = false)
    private boolean manualClosed = false;

    @Transient
    public boolean getOpenStatus() {

        if (manualClosed) return false;
        if (manualOpen) return true;

        if (openTime == null || closeTime == null) return false;

        LocalTime now = LocalTime.now();

        return now.isAfter(openTime) && now.isBefore(closeTime);
    }
}

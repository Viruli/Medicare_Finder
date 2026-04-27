package com.pharmacyproject.medicarefinder.entity;

import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;


@Entity
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pharmacyName;
    private String city;
    private String email;
    private String phone;
    private String logoUrl;

    private LocalTime openTime;
    private LocalTime closeTime;

    @Column(nullable = false)
    private boolean manualOpen = false;

    @Column(nullable = false)
    private boolean manualClosed = false;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User owner;

    @OneToMany(mappedBy = "pharmacy")
    private List<Medicine> medicines;

    @Transient
    public boolean getOpenStatus() {

        if (manualClosed) return false;
        if (manualOpen) return true;

        if (openTime == null || closeTime == null) return false;

        LocalTime now = LocalTime.now();

        return now.isAfter(openTime) && now.isBefore(closeTime);
    }
}

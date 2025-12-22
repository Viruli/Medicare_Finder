import React from "react";
import { Container, Carousel, Button } from "react-bootstrap";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <Carousel fade className={styles.carousel}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/HomeImg 1.jpeg"
            alt="Healthcare 1"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h1>Find the Best Pharmacies Near You</h1>
            <p>Reliable medicines, fast delivery, trusted services.</p>
            <Button className={styles.browseBtn} href="/pharmacies">
              Explore Pharmacies
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/HomeImg 2.jpeg"
            alt="Healthcare 2"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h1>Wide Range of Medicines</h1>
            <p>Browse thousands of medicines at your convenience.</p>
            <Button className={styles.browseBtn} href="/medicines">
              Explore Medicines
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/HomeImg 3.jpeg"
            alt="Healthcare 3"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h1>Trusted by Thousands</h1>
            <p>Reliable, fast, and safe healthcare support at your fingertips.</p>
            <Button className={styles.browseBtn}  href="/login">
              Get Started
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className={styles.aboutSection}>
        <h2>About MediCare Finder</h2>
        <p>
          MediCare Finder helps you discover pharmacies and medicines near your location.
          Our platform ensures you get access to trusted pharmacies with up-to-date
          availability and pricing. Experience healthcare at your fingertips.
        </p>
        <div className={styles.aboutButtons}>
          <Button className={styles.exploreBtn} href="/pharmacies">
            Explore Pharmacies
          </Button>
          <Button className={styles.browseBtn}  href="/medicines">
            Browse Medicines
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import styles from "./Login.module.css";
import { Form, Button, Container } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className={styles.loginWrapper}>
  <div className={styles.loginCard}>
    <h2 className={styles.title}>Admin Login</h2>
    <p className={styles.subtitle}>Welcome back! Please login to continue</p>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formControl}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.formControl}
          required
        />
      </Form.Group>

      {error && <p className={styles.errorText}>{error}</p>}

      <Button type="submit" className={styles.loginBtn}>
        Login
      </Button>
    </Form>
  </div>
</Container>

  );
};

export default Login;

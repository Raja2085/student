"use client";

import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "Admin") {
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
      }
      window.location.href = "/dashboard";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <h2 className="mb-4 text-center">Sign In</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Sign In
        </Button>
      </Form>
    </>
  );
}

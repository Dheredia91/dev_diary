import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Component handles Login */

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(loginUser({ username, password }));
  };

useEffect(() => {
  console.log("User object: ", user); // Add this line for debugging
  if (user) {
    navigate('/dashboard'); // Redirect to dashboard on successful login
  }
}, [user, navigate]);


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Dev Diary</h2>
          <Form>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              disabled={loading}
              onClick={handleClick}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center mt-3">
              <p>
                Don't have an account? <a href="/register">Register</a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setUserId } from './loginSlice';
import loginService from '../../services/loginService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Login() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService.logIn(credentials);
      const { message, token, userId } = await response.json();

      if (message === 'success') {
        localStorage.setItem('token', token);
        dispatch(setIsLoggedIn(true));
        dispatch(setUserId(userId));
        navigate(`/`);
      }
    } catch {
      // handle error
    }
  };
  return (
    <Row className="login-container">
      <h1>Log In</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" type="submit">
          Log In
        </Button>
      </Form>
      <Form.Text className="mt-3">
        No account?&nbsp;
        <Link to="/register">Sign up!</Link>
      </Form.Text>
    </Row>
  );
}

export default Login;

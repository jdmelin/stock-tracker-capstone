import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <Row className="login-container">
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mt-3">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" className="mt-3" type="submit">
          Sign Up
        </Button>
      </Form>
      <Form.Text className="mt-3">
        Already have an account?&nbsp;
        <Link to="/login">Log In!</Link>
      </Form.Text>
    </Row>
  );
}

export default Register;

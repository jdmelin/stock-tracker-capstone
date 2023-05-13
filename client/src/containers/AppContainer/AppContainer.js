
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../containers/Login/loginSlice';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function AppContainer() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const hasToken = !!localStorage.getItem('token');
  
  const renderLinks = () => {
    if (!isLoggedIn && !hasToken) {
      return (
        <div>
          <Link className="navbar-brand" to="/register">
            Register
          </Link>
          <Link className="navbar-brand" to="/login">
            Log In
          </Link>
        </div>
      );
    }

    if (isLoggedIn || hasToken) {
      return (
        <Link
          className="navbar-brand"
          to={isLoggedIn || hasToken ? '/logout' : '/login'}
        >
          {isLoggedIn || hasToken ? 'Log Out' : 'Log In'}
        </Link>
      );
    }
  };
  return (
    <>
      <Navbar className="navbar-light bg-light p-2 justify-content-between">
        <Link className="navbar-brand" to="/">
          Stock Tracker
        </Link>
        {renderLinks()}
      </Navbar>
      <Container className="mt-5">
        <Outlet />
      </Container>
    </>
  );
}

export default AppContainer;

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../containers/Login/loginSlice';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const hasToken = !!localStorage.getItem('token');

  if (!isLoggedIn && !hasToken) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;

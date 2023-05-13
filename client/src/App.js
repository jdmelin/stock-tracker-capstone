import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { selectIsLoggedIn } from './containers/Login/loginSlice';
import AppContainer from './containers/AppContainer/AppContainer';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import MyStocks from './containers/MyStocks/MyStocks';
import ProtectedRoute from './containers/ProtectedRoute/ProtectedRoute';
import Register from './containers/Register/Register';
import Stocks from './containers/Stocks/Stocks';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppContainer />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          <Route path="/logout" element={<Logout />} />
          {!isLoggedIn && <Route path="/register" element={<Register />} />}
          <Route
            path="/stocks/:userId"
            element={
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-stocks/:userId"
            element={
              <ProtectedRoute>
                <MyStocks />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

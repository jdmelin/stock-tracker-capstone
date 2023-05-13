import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setUserId } from '../Login/loginSlice';
import { setMyStocks } from '../MyStocks/myStocksSlice';
import { setStocks } from '../Stocks/stocksSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetStore = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUserId(null));
    dispatch(setMyStocks([]));
    dispatch(setStocks([]));
  }

  useEffect(() => {
    resetStore();
    localStorage.removeItem('token');
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default Logout;

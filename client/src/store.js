import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './containers/Login/loginSlice';
import myStocksReducer from './containers/MyStocks/myStocksSlice';
import stocksReducer from './containers/Stocks/stocksSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    myStocks: myStocksReducer,
    stocks: stocksReducer,
  },
});

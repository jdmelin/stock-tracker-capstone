import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const myStocksSlice = createSlice({
  name: 'myStocks',
  initialState,
  reducers: {
    addToMyStocks: (state, action) => {
      state.value = [...state.value, action.payload].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    removeMyStock: (state, action) => {
      const stocks = state.value;
      const stockId = action.payload;
      state.value = stocks.filter((stock) => stock.id !== stockId);
    },
    setMyStocks: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addToMyStocks, removeMyStock, setMyStocks } =
  myStocksSlice.actions;

export const selectMyStocks = (state) => state.myStocks.value;

export default myStocksSlice.reducer;

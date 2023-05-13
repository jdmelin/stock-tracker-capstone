import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    addAsFavorite: (state, action) => {
      const stocks = state.value;
      const stockId = action.payload;
      state.value = stocks.map((stock) => {
        if (stock.id === stockId) {
          stock.favorite = true;
        }
        return stock;
      });
    },
    removeAsFavorite: (state, action) => {
      const stocks = state.value;
      const stockId = action.payload;
      state.value = stocks.map((stock) => {
        if (stock.id === stockId) {
          stock.favorite = false;
        }
        return stock;
      });
    },
    setStocks: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addAsFavorite, removeAsFavorite, setStocks } =
  stocksSlice.actions;

export const selectStocks = (state) => state.stocks.value;

export default stocksSlice.reducer;

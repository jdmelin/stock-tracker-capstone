import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { removeMyStock, selectMyStocks, setMyStocks } from './myStocksSlice';
import { removeAsFavorite } from '../Stocks/stocksSlice';
import stockService from '../../services/stockService';
import Row from 'react-bootstrap/Row';
import Stock from '../../components/Stock/Stock';

function MyStocks() {
  const stocks = useSelector(selectMyStocks);
  const dispatch = useDispatch();
  const [stockAverage, setStockAverage] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    if (!stocks.length) {
      getStocks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const average = stockService.getAveragePrice(stocks);
    setStockAverage(average);
  }, [stocks]);

  const getStocks = async () => {
    try {
      const response = await stockService.fetchMyStocks(userId);
      const stockData = await response.json();
      const stocksWithPrices = await stockService.setStockPrices(stockData);
      dispatch(setMyStocks(stocksWithPrices));
    } catch {
      // TODO: handle error
    }
  };

  const handleRemoveStockFromFavorites = async (stockId) => {
    try {
      const response = await stockService.removeStockFromFavorites(
        userId,
        stockId
      );
      const { message } = await response.json();

      if (message === 'success') {
        dispatch(removeMyStock(stockId));
        dispatch(removeAsFavorite(stockId));
      }
    } catch {
      // TODO: handle error
    }
  };

  return (
    <>
      <h1 className="display-4">My Stocks</h1>
      <Link to={`/stocks/${userId}`}>See All Stocks</Link>
      <hr className="my-4" />
      <h4 className="mb-3">Average Price: ${stockAverage}</h4>
      <Row>
        {stocks.map((stock) => (
          <Stock
            key={stock.id}
            onRemoveStockFromFavorites={handleRemoveStockFromFavorites}
            stock={stock}
            type="my"
          />
        ))}
      </Row>
    </>
  );
}

export default MyStocks;

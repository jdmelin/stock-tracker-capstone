import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addAsFavorite, selectStocks, setStocks } from './stocksSlice';
import { addToMyStocks } from '../MyStocks/myStocksSlice';
import stockService from '../../services/stockService';
import Stock from '../../components/Stock/Stock';
import Row from 'react-bootstrap/Row';

function Stocks() {
  const stocks = useSelector(selectStocks);
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
      const response = await stockService.fetchStocks(userId);
      const stockData = await response.json();
      const stocksWithPrices = await stockService.setStockPrices(stockData);
      dispatch(setStocks(stocksWithPrices))
    } catch {
      // TODO: handle error
    }
  };

  const handleAddStockToFavorites = async (stockId) => {
    try {
      const response = await stockService.addStockToFavorites(userId, stockId);
      const { message } = await response.json();

      if (message === 'success') {
        const stock = stocks.find((stock) => stock.id === stockId);
        dispatch(addToMyStocks(stock));
        dispatch(addAsFavorite(stockId));
      }
    } catch {
      // TODO: handle error
    }
  };

  return (
    <>
      <h1 className="display-4">Stocks</h1>
      <Link to={`/my-stocks/${userId}`}>See Your Stocks</Link>
      <hr className="my-4" />
      <h4 className="mb-3">Average Price: ${stockAverage}</h4>
      <Row>
        {stocks.map((stock) => (
          <Stock
            key={stock.id}
            onAddStockToFavorites={handleAddStockToFavorites}
            stock={stock}
            type="all"
          />
        ))}
      </Row>
    </>
  );
}

export default Stocks;

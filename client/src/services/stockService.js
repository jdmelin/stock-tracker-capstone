const baseUrl = process.env.REACT_APP_BASE_URL;

const stockService = {
  addStockToFavorites(userId, stockId) {
    return fetch(`${baseUrl}/stock/${userId}/${stockId}`, {
      ...this.getDefaultFetchOptions(),
      method: 'POST',
    });
  },

  getDefaultFetchOptions() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },

  fetchMyStocks(userId) {
    return fetch(
      `${baseUrl}/my-stocks/${userId}`,
      this.getDefaultFetchOptions()
    );
  },

  fetchStocks(userId) {
    return fetch(`${baseUrl}/stocks/${userId}`, this.getDefaultFetchOptions());
  },

  getAveragePrice(stocks) {
    if (!stocks.length) return 0;

    const sum = stocks.reduce((total, stock) => {
      total += stock.price;
      return total;
    }, 0);
    const average = (sum / stocks.length).toFixed(2);

    return average;
  },

  getStockPrice(symbol) {
    const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;

    return fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );
  },

  async setStockPrices(stockData) {
    let stocks = JSON.parse(JSON.stringify(stockData));

    for (const stock of stocks) {
      let price;
      try {
        const response = await this.getStockPrice(stock.symbol);
        const { c } = await response.json();
        price = c;
      } catch {
        price = 0;
      } finally {
        const stockToUpdate = stocks.find((s) => stock.id === s.id);
        const updatedStock = {
          ...stockToUpdate,
          price,
        };
        const filteredStocks = stocks.filter((s) => stock.id !== s.id);
        stocks = [...JSON.parse(JSON.stringify(filteredStocks)), updatedStock];
      }
    }

    return stocks;
  },

  removeStockFromFavorites(userId, stockId) {
    return fetch(`${baseUrl}/stock/${userId}/${stockId}`, {
      ...this.getDefaultFetchOptions(),
      method: 'DELETE',
    });
  },
};

export default stockService;

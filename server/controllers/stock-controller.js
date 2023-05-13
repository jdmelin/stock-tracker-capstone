const { Stock, User, UserStock } = require('../models');

module.exports = {
  async createUserStock(req, res) {
    const { userId } = req.params;
    const { stockId } = req.params;

    try {
      await UserStock.create({
        userId,
        stockId,
      });
      res.json({ message: 'success' });
    } catch {
      res.json({ message: 'failure' });
    }
  },

  async getAll(req, res) {
    try {
      const { userId } = req.params;

      const allStocks = await Stock.findAll({
        attributes: ['id', 'name', 'symbol'],
        order: [['name', 'asc']],
      });
      const userStocks = await UserStock.findAll({ where: { userId } });

      const stocks = allStocks.map((stock) => stock.get({ plain: true }));

      const favorites = userStocks.reduce((favs, userStock) => {
        if (userStock.userId === Number(userId)) {
          favs.push(userStock.stockId);
        }

        return favs;
      }, []);

      for (const stock of stocks) {
        const isFavorite = favorites.includes(stock.id);
        stock.favorite = isFavorite;
      }

      res.json(stocks);
    } catch {
      // handle error
    }
  },

  async getAllByUserId(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        order: [[{ model: Stock, as: 'stocks' }, 'name', 'asc']],
        include: {
          model: Stock,
          as: 'stocks',
          attributes: ['id', 'name', 'symbol'],
          through: {
            attributes: [],
          },
        },
      });

      const stocks = user.stocks.map((stock) => stock.get({ plain: true }));

      res.json(stocks);
    } catch {
      // handle error
    }
  },

  async removeUserStock(req, res) {
    const { userId } = req.params;
    const { stockId } = req.params;

    try {
      await UserStock.destroy({
        where: {
          userId,
          stockId,
        },
      });
      res.json({ message: 'success' });
    } catch {
      res.json({ message: 'failure' });
    }
  },
};

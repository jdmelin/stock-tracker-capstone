const router = require('express').Router();
const stockController = require('../controllers/stock-controller');
const authenticate = require('../middlewares/authenticate');

router
  .route('/api/stocks/:userId')
  .get(authenticate, stockController.getAll);

router
  .route('/api/stock/:userId/:stockId')
  .post(authenticate, stockController.createUserStock)
  .delete(authenticate, stockController.removeUserStock);

router.route('/api/my-stocks/:userId').get(authenticate, stockController.getAllByUserId);

module.exports = router;

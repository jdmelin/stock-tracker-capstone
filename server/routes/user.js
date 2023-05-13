const router = require('express').Router();
const userController = require('../controllers/user-controller');

router.route('/api/login').post(userController.logIn);

router.route('/api/register').post(userController.register);

module.exports = router;

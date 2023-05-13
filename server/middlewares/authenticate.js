const { User } = require('../models');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decodedToken.userId);

      if (user) {
        next();
      } else {
        // TODO: handle case where user doesn't exist
      }
    } catch {
      // TODO: handle error
    }
  } else {
    // TODO: handle case when no authHeader
  }
};

module.exports = authenticate;

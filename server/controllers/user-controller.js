const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  async logIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email },
      });

      bcrypt.compare(password, user.password, (err, match) => {
        if (match) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          );

          res.json({ message: 'success', token, userId: user.id });
        } else {
        }
      });
    } catch {
      res.json({ message: 'failure' });
    }
  },

  async register(req, res) {
    try {
      await User.create(req.body);
      res.json({ message: 'success' });
    } catch {
      res.json({ message: 'failure' });
    }
  },
};

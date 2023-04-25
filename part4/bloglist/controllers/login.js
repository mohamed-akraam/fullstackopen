const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.get('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(400).json({ error: 'username or password is incorrect' });
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return response.status(200).send({
    token,
    username: user.eventNames,
    name: user.name,
  });
});

module.exports = loginRouter;
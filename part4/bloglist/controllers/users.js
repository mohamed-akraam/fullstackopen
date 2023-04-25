const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const user = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.status(200).json(user);
});

// eslint-disable-next-line consistent-return
userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  // const user = await User.findOne({ username });
  if (password.length < 3) {
    return response.status(400).send({ error: 'min password length' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);

  // response.status(200).send({
  //   username: newUser.username,
  //   name: newUser.name,
  //   id: user.id,
  // });
});

module.exports = userRouter;

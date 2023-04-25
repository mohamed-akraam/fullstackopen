// const http = require('http');
const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { errorHandler, tokenExtractor } = require('./utils/middleware');
const { info, error } = require('./utils/logger');

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('Server is connected to MONGODB');
  })
  .catch((err) => {
    error('Failed to connect to MONGODB', err.message);
  });

app.use(cors());
app.use(express.json());

app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

module.exports = app;

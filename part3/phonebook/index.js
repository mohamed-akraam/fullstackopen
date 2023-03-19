require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Persons = require('./models/mongo');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log('Method', req.method);
  console.log('path', req.path);
  console.log('body', req.body);
  console.log('----');
  next();
};

app.use(requestLogger);

app.get('/api/persons', (request, response) => {
  Persons.find({}).then((persons) => {
    response.json(persons);
  });
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.get('/api/persons/:id', (req, res, next) => {
  Persons.findById(req.params.id)
    .then((person) => {
      // eslint-disable-next-line no-unused-expressions
      person ? res.json(person) : res.status(404).end();
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Persons.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Persons.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;

  const phone = new Persons({
    name: body.name,
    number: body.number,
  });

  phone.save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.use(unknownEndPoint);

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malforamtted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message });
  }
  next();
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});

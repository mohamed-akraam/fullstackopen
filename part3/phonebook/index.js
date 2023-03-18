require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Persons = require('./models/mongo');


const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan('tiny'));

// const log = (tokens, req, res) => {
//   return [
//   tokens.method(req, res),
//   tokens.url(req, res),
//   tokens.status(req, res),
//   tokens.res(req, res, 'content-length'), '-',
//   tokens['response-time'](req, res), 'ms',
//   ].join(' ')
// }

app.use(morgan((tokens, req, res) => {
  const log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ')

  if (req.method === "POST") {
    return [
      log,
      JSON.stringify(req.body)
    ].join(' ')
  } else {
    return [
      log
    ]
  }
}))

const requestLogger = (req, res, next) => {
  console.log('Method', req.method);
  console.log('path', req.path);
  console.log('body', req.body);
  console.log('----');
  next();
}

app.use(requestLogger)

app.get('/api/persons', (request, response) => {
  Persons.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/info', (request, response) => {
  response.write(`<p>Phonebook has info for ${phonebook.length} people<p>`);
  response.write(`<p>${new Date()}</p>`);
  response.end();
  // response.end(info.date);
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons/:id', (req, res, next) => {
  Persons.findById(req.params.id).then(person => {
    person ? res.json(person) : res.status(404).end()
  })
  .catch(err => next(err))
  // const id = request.params.id;
  // const phone = phonebook.find(item => item.id === Number(id));
  // phone
  //   ? response.json(phone)
  //   : response.status(404).send(`<h1>Error 404 Page is not found</h1>`);
});

app.delete('/api/persons/:id', (req, res, next) => {

  Persons.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => next(err))

  // const id = req.params.id;
  // phonebook = phonebook.filter((item) => item.id !== Number(id));
  // res.status(204).end('Error 204 no content');
  // console.log(phonebook);
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  // console.log(req);
  console.log(body.name, body.number, body);
  console.log(body, 'hello there');

  const person = {
    name: body.name,
    number: body.number,
  }

  Persons.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res) => {

  const body = req.body;

  if(!body.name || !body.number) {
    return res.status(404).json({ error: "content missing" })
  }

  const phone = new Persons({
    name: body.name,
    number: body.number,
  });

  phone.save().then(savedPerson => {
    res.json(savedPerson)
  })

  // if (!phone.name || !phone.number) {
  //   res.status(400).json({ error: 'content is missing' });
  // } else if (phonebook.some((item) => item.name === phone.name)) {
  //   res.status(409).json({ error: 'name must be unique' });
  // } else {

  //   res.json(phonebook.concat(phone));
  // }
});


app.use(unknownEndPoint);

const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log(err.message);
  console.log(err.name);
  if (err.name === 'CastError') {
    res.status(400).send({ error: 'malforamtted id' });
  }
  next();
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});

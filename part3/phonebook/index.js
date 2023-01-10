require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Persons = require('./module/mongo');

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

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const phone = phonebook.find((item) => item.id === Number(id));
  phone
    ? response.json(phone)
    : response.status(404).send(`<h1>Error 404 Page is not found</h1>`);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((item) => item.id !== Number(id));
  res.status(204).end('Error 204 no content');
  console.log(phonebook);
});

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});

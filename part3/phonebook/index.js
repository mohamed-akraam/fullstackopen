const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());


// app.use(morgan('tiny'));

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

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(phonebook);
});

app.get('/info', (request, response) => {
  // const info = {
  //   content: `Phonebook has info for ${phonebook.length} people`,
  //   date: new Date(),
  // }
  // response.writeHead(200, { 'Content-Type': 'text/html' })
  // response.set('Content-Type', 'text/html')
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
  const phone = {
    id: Math.round(Math.random() * 10000),
    name: req.body.name,
    number: req.body.number,
  };
  if (!phone.name || !phone.number) {
    res.status(400).json({ error: 'content is missing' });
  } else if (phonebook.some((item) => item.name === phone.name)) {
    res.status(409).json({ error: 'name must be unique' });
  } else {

    res.json(phonebook.concat(phone));
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});

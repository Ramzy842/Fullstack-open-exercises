require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const favicon = require('express-favicon');
const Person = require('./models/Person');

let data = [];

app.use(express.static('build'));
app.use(favicon(`${__dirname}build/favicon.ico`));
morgan.token('body', (req) => req.method === 'POST' && JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);
app.use(cors());
app.use(express.json());

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    data = [...result];
    res.json(result);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.get('/info', (req, res) => {
  const html = `<p>Phonebook has info for ${data.length} people</p>
<p>${new Date()}</p>
`;
  res.send(html);
});

// eslint-disable-next-line consistent-return
app.post('/api/persons/', (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'missing name or number' });
  }
  const existingName = data.find(
    (user) => user.name.toLowerCase() === body.name.toLowerCase(),
  );
  if (existingName) {
    return res.status(409).json({ error: 'Name already exists' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((result) => {
      data = [...data, result];
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  Person.findByIdAndUpdate(
    id,
    { number: body.number },
    { new: true, runValidators: true },
  )
    .then((response) => {
      const newData = data.map((person) => (person.id === id ? response : person));
      data = [...newData];
      res.status(200).json(response);
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.deleteOne({ _id: id })
    .then(() => {
      const newData = data.filter((person) => person.id !== id);
      data = newData;
      res.status(200).json({ message: 'person deleted successfully', data });
    })
    .catch((err) => {
      next(err);
    });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

const jsonServer = require('json-server');
const server = jsonServer.create();
server.use(jsonServer.bodyParser);
const middlewares = jsonServer.defaults();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'data.json'));

const users = [
  {
    id: 0,
    firstName: 'Boby',
    lastName: 'Smith',
    age: 23,
  },
  {
    id: 1,
    firstName: 'John',
    lastName: 'Wick',
    age: 45,
  },
  {
    id: 2,
    firstName: 'Baboulinet',
    lastName: 'Gazoil',
    age: 34,
  },
];

server.use(middlewares);

server.all('/*', enableCors);

server.get('/users', (req, res) => {
  res.status(200).jsonp(users);
});

server.post('/users', (req, res) => {
  const maxId = Math.max.apply(
    Math,
    users.map((user) => user.id)
  );
  const user = {
    id: maxId != null ? maxId + 1 : 0,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  };
  users.push(user);
  res.status(201).jsonp(user);
});

server.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user == null) {
    res.status(404).jsonp(null);
  } else {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    res.status(200).jsonp(user);
  }
});

server.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user == null) {
    res.status(404).jsonp(null);
  } else {
    res.status(200).jsonp(user);
  }
});

server.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex != null) {
    users.splice(userIndex, 1);
  }
  res.status(200).jsonp(null);
});

function enableCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Correlation-ID, X-Requested-With, Content-Type, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST, OPTION');
  next();
}

server.use(router);
server.listen(3000, '0.0.0.0', () => {
  console.log('JSON Server is running');
});

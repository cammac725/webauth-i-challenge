const express = require('express');

const Users = require('../users/users-model');
const restricted = require('../config/authentication')
const configMiddleware = require('../config/middleware');

const server = express();

configMiddleware(server);

server.get('/', (req, res) => {
  res.send("Fire in the hole!")
});

server.post('/api/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome, ${user.username}` })
      } else {
        res.status(401).json({ message: 'Invalid crenetials' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.get('/api/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = server;

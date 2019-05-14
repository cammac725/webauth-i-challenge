const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const configMiddleware = require('../config/middleware');
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express();

configMiddleware(server);

const sessionConfig = {
  name: 'monkey',
  secret: 'camrock',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('../data/dbConfig'),
    tablename: 'session',
    sidfilename: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(session((sessionConfig)))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("Fire in the hole!")
});

module.exports = server;

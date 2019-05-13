const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

module.exports = server => {
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
}
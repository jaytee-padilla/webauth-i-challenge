const express = require('express');
const helmet = require('helmet');
const usersRoute = require('./routes/usersRoute');

const db = require('./data/db-config');

const server = express();
server.use(helmet());
server.use(express.json());

// check if API is running
server.get('/', (req, res) => {
	res.send(`<h1>API is running</h1>`);
});

// routes
server.use('/api', usersRoute);

module.exports = server;
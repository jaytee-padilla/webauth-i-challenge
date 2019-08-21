const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const usersRoute = require('./routes/usersRoute');

const db = require('./data/db-config');

const sessionOptions = {
	secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe', // for encryption
	cookie: {
		secure: process.env.COOKIE_SECURE || false, // should be true in production, false in development
		maxAge: 1000 * 60 * 60 * 24, // milliseconds
		httpOnly: true // client JS has no access to cookie
	},
	resave: false,
	saveUninitialized: true
}

const server = express();
server.use(helmet());
server.use(express.json());
server.use(session(sessionOptions));

// check if API is running
server.get('/', (req, res) => {
	res.send(`<h1>API is running</h1>`);
});

// routes
server.use('/api', usersRoute);

module.exports = server;
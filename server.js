const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session); // remember to pass the session into this
const usersRoute = require('./routes/usersRoute');

const db = require('./data/db-config');

// this is the session configuration
// each client will have their own session id
// the session info can be accessed via req.session object
const sessionOptions = {
	name: 'yungSesh', // names the cookie instead of the default 'connect.sid' (session id)
	secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe', // for encryption
	cookie: {
		secure: process.env.COOKIE_SECURE || false, // should be true in production, false in development
		maxAge: 1000 * 60 * 60 * 24, // milliseconds
		httpOnly: true // client JS has no access to cookie
	},
	resave: false,
	saveUninitialized: true,
	store: new knexSessionStore({
		knex: db,
		createtable: true,
		clearInterval: 1000 * 60 * 60, // how long before we clear out expired sessions
	})
}

const server = express();
server.use(helmet());
server.use(express.json());
server.use(session(sessionOptions)); // <<<< This is how to use the session

// check if API is running
server.get('/', (req, res) => {
	res.json({api: 'running', session: req.session});
});

// routes
server.use('/api', usersRoute);

module.exports = server;
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// database/models
const db = require('../models/usersModel');

// CRUD
// GET
// get users from database
router.get('/users', restricted, (req, res) => {
	db.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(400).json({message: 'Error retrieving users from database'});
		});
});

// POST
// add user to database
router.post('/register', (req, res) => {
	const userAcc = req.body;

	// hash password
	let hash = bcrypt.hashSync(userAcc.password);
	userAcc.password = hash;

	db.add(userAcc)
		.then(user => {
			res.status(201).json({message: 'New user account created'});
		})
		.catch(error => {
			res.status(400).json({message: 'Unable to register new user'})
		})
});

// login
router.post('/login', (req, res) => {
	const userAcc = req.body;

	db.getByUsername(userAcc.username)
		.then(user => {
			if(user && bcrypt.compareSync(userAcc.password, user.password)) {
				req.session.username = userAcc.username; // this only runs on successful login

				res.status(200).json({message: `Welcome ${user.username}`});
			} else {
				res.status(404).json({message: 'Invalid login credentials'});
			}
		})
		.catch(error => {
			res.status(400).json({message: 'Could not retrieve data from database'});
		})
});

function restricted(req, res, next) {
	let userAcc = req.headers;

	// check if username & password for login account has been provided
	// if so, proceed with login validation, if not, throw error
	if(userAcc.username && userAcc.password) {
		// validates the logged in user's credentials
		db.getByUsername(userAcc.username)
			.then(user => {
				if(user && bcrypt.compareSync(userAcc.password, user.password)) {
					// if the login credentials are valid, proceed with CRUD functionality
					next();
				} else {
					res.status(404).json({message: 'Invalid login credentials'});
				}
			})
			.catch(error => {
				res.status(400).json({message: 'Could not retrieve data from database'});
			})
	} else {
		res.status(400).json({message: 'Please provide valid login credentials'});
	}
}

module.exports = router;
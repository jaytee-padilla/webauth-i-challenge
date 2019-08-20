const express = require('express');
const router = express.Router();

// database/models
const db = require('../models/usersModel');

// CRUD
// GET
router.get('/', (req, res) => {
	db.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(400).json({message: 'Error retrieving users from database'});
		});
});

module.exports = router;
const express = require('express');
const router = express.Router();

// database
const db = require('../data/db-config');

// models
const usersModel = require('../models/usersModel');

// CRUD
// GET
router.get('/', (req, res) => {
	usersModel.find();
});

module.exports = router;
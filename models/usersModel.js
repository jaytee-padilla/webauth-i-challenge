// import the database
const db = require('../data/db-config');

// export the functions
module.exports = {
	find
}

function find() {
	return db('users');
}
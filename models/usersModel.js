// import the database
const db = require('../data/db-config');

// export the functions
module.exports = {
	get
}

function get() {
	return db('users');
}
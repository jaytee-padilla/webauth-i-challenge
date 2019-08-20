// import the database
const db = require('../data/db-config');

// export the functions
module.exports = {
	get,
	getByUsername,
	add
}

function get() {
	return db('users');
}

function getByUsername(username) {
	return db('users')
		.where('users.username', username)
		.first()
}

function add(userAcc) {
	return db('users')
		.insert(userAcc)
		.then(createdAcc => {
			return createdAcc;
		});
}
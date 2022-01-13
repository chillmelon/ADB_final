const db = require("./db.js");

const House = {
	async get() {
		try {
			let result = await db.query("SELECT * FROM houses LIMIT 5;");
			return result.rows;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
}

module.exports = House

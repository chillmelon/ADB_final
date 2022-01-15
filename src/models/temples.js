const db = require("./db.js");

const Temple = {
	async test() {
		try {
			let result = await db.query("SELECT * FROM temples LIMIT 5;");
			return result.rows;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},
	async find_all() {
		try {
			let sql = "SELECT * FROM temples;";
			let result = await db.query(sql)
			console.log(result);
			return result.rows;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},
}

module.exports = Temple

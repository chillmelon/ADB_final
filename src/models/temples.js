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
	async get_by_god(god) {
		try {
			let sql = "SELECT * from temples"
				+ " " + "WHERE god_0 = $1"
				+ " " + "OR god_1 = $1"
				+ " " + "OR god_2 = $1;";
			let result = await db.query(sql, [god]);
			console.log(result);
			return result.rows;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},
}

module.exports = Temple

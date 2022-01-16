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
	async get_by_god(data) {
		try {
			let sql = "SELECT * from temples WHERE"
				+ "(god_0 = $1 OR god_1 = $1 OR god_2 = $1)"
				+ "AND" + "($2::text is null OR city = $2)"
				+ "AND" + "($3::text is null OR dist = $3);";

			let values = [
				data.god,
				data.city,
				data.district
			];

			let result = await db.query(sql, values);
			return result.rows;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},
}

module.exports = Temple

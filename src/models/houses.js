const db = require("./db.js");

const House = {
	async test() {
		try {
			let result = await db.query("SELECT * FROM houses LIMIT 5;");
			return result.rows;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},
	async get(data) {
		try {
			let sql = "SELECT * FROM houses WHERE"
				+ " " + "($1::int is null OR bed_room = $1)"      + "AND"
				+ " " + "($2::int is null OR living_room = $2)"   + "AND"
				+ " " + "($3::int is null OR toilet = $3)"        + "AND"
				+ " " + "($4::int is null OR building_type = $4)" + "AND"
				+ " " + "($5::int is null OR age > $5)"           + "AND"
				+ " " + "($6::int is null OR age < $6)"           + "AND"
				+ " " + "($7::bool is null OR balcony = $7)"      + "AND"
				+ " " + "($8::int is null OR price_sqm > $8)"     + "AND"
				+ " " + "($9::int is null OR price_sqm < $9)"     + "AND"
				+ " " + "($10::int is null OR price_total > $10)" + "AND"
				+ " " + "($11::int is null OR price_total < $11)" + "AND"
				+ " " + "($12::int is null OR parking_type = $12);"

			let values = [
				data.bed_room,
				data.living_room,
				data.toilet,
				data.building_type,
				data.age_lower,
				data.age_upper,
				data.balcony,
				data.price_sqm_lower,
				data.price_sqm_upper,
				data.price_total_lower,
				data.price_total_upper,
				data.parking_type,
			];

			let result = await db.query(sql, values)

			return result.rows;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},
}

module.exports = House

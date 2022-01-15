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
				+ "($1::text is null OR city = $1)"
				+ "AND" + "($2::text is null OR district = $2)"
				+ "AND" + "($3::int is null OR bed_room = $3)"
				+ "AND" + "($4::int is null OR living_room = $4)"
				+ "AND" + "($5::int is null OR toilet = $5)"
				+ "AND" + "(building_type = ANY($6))"
				+ "AND" + "($7::int is null OR age > $7)"
				+ "AND" + "($8::int is null OR age < $8)"
				+ "AND" + "($9::bool is null OR balcony = $9)"
				+ "AND" + "($10::int is null OR price_sqm > $10)"
				+ "AND" + "($11::int is null OR price_sqm < $11)"
				+ "AND" + "($12::int is null OR price_total > $12)"
				+ "AND" + "($13::int is null OR price_total < $13)"
				+ "AND" + "(parking_type = ANY($14));"

			let values = [
				data.city,
				data.district,
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

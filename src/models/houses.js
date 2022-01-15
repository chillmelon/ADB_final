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
				+ "AND" + "(parking_type = ANY($14));";

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

	async get_by_god (data) {
		try {
			let sql =
				"SELECT * FROM houses h" + " "
				+ "JOIN (SELECT * from temples" + " "
					+ "WHERE $1::text is null" + " "
					+ "OR god_0 = $1" + " "
					+ "OR god_1 = $1" + " "
					+ "OR god_2 = $1) sub" + " "
				+ "ON st_dwithin(h.geog, sub.geog, 100)"
				+ "WHERE ($2::text is null OR h.city = $2)"
				+ "AND" + "($3::text is null OR h.district = $3)"
				+ "AND" + "($4::int is null OR h.bed_room = $4)"
				+ "AND" + "($5::int is null OR h.living_room = $5)"
				+ "AND" + "($6::int is null OR h.toilet = $6)"
				+ "AND" + "(h.building_type = ANY($7))"
				+ "AND" + "($8::int is null OR h.age > $8)"
				+ "AND" + "($9::int is null OR h.age < $9)"
				+ "AND" + "($10::bool is null OR h.balcony = $10)"
				+ "AND" + "($11::int is null OR h.price_sqm > $11)"
				+ "AND" + "($12::int is null OR h.price_sqm < $12)"
				+ "AND" + "($13::int is null OR h.price_total > $13)"
				+ "AND" + "($14::int is null OR h.price_total < $14)"
				+ "AND" + "(h.parking_type = ANY($15));";

			let values = [
				data.god,
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

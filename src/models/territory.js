const db = require("./neo4j.js");

function query(godName, districtList) {
	return new Promise(function (resolve, reject) {
		var session = db.session()
		session

			.run('MATCH (g:god)-[r1:IN_CHARGE_OF]->(t:temple)-[r2:CLOSE_TO]-(h:house)-[r3:LOCATED_IN]->(d:district)	'
				+ 'WHERE 	g.name = $god_name '
				+ 'RETURN	g, t, h, d'
				, { 'god_name': godName })
			.then(function (result) {
				// outf = (JSON.stringify(result.records))
				resolve(result.records)
			})
			.catch(function (err) {
				console.log(err)
				resolve([]);
			})
	})
}

const Territory = {
	async test() {
		var session = db.session()

		session
			.run('MATCH(g:god) RETURN g LIMIT 5')
			.then(function (result) {
				result.records.forEach(function (record) {
					console.log(record);   // properties is a set
				})
			})
			.catch(function (err) {
				console.log(err);
			})

	},
	async get(data) {
		godName = data.god_name
		districtList = data.districts;
		let rsp = await query(godName, districtList)
		return rsp
	}
}

module.exports = Territory

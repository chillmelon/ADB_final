const db = require("./neo4j.js");

const Territory = {
	async test() {
		var session = db.session()
		
		session
    		.run('MATCH(g:god) RETURN g LIMIT 5')
    		.then(function(result){
      			result.records.forEach(function(record){
        			console.log(record._fields[0].properties);   // properties is a set
      			})
    		})
    		.catch(function(err){
      				console.log(err);
			})
			
	},
	async get(data) {

		godName = data.god_name
		districtList = data.districts;
		var session = db.session()
		session
			
			.run('MATCH (g:god)-[r1:IN_CHARGE_OF]->(t:temple)-[r2:CLOSE_TO]-(h:house)-[r3:LOCATED_IN]->(d:district)	'
				+	'WHERE 	g.name = $god_name AND d.name IN $districtList AND r2.distance < 0.3 '
				+	'RETURN	g, t, h, d'
			,{'god_name': godName, 'districtList': districtList})
			.then(function(result){
				outf = (JSON.stringify(result.records))
      			return outf
			})
			.catch(function(err){
					console.log(err)
			})
		
		
	}
}

module.exports = Territory

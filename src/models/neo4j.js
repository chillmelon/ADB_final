const neo4j = require("neo4j-driver");

//const dbConfig = require("../config/db.js")

driver = neo4j.driver('bolt://db2:7687', neo4j.auth.basic('neo4j', '1234'));

/*const pool = new Pool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});
*/

module.exports = driver;

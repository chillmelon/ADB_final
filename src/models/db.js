const pg = require("pg");
const { Pool } = pg;
const dbConfig = require("../config/db.js")

const pool = new Pool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});

module.exports = pool;

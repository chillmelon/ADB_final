import pg from "pg";
const { Pool } = pg;
import dbConfig from "../config/dbConfig.js";

const pool = new Pool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});

export default pool;

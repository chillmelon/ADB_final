const config = {
	host: process.env.DB_HOST || "127.0.0.1",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "root",
	database: process.env.DB_DATABASE || "adb_final",
};
module.exports = config;

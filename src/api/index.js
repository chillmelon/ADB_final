const house_controller = require("./routers/house");
const temple_controller = require("./routers/temple");

console.log("api loaded");

module.exports = (app) => {
	app.use("/api/house", house_controller());
	app.use("/api/temple", temple_controller());
};

const house_controller = require("./routers/house");
const territory_controller = require("./routers/territory")

console.log("api loaded");

module.exports = (app) => {
	app.use("/api/house", house_controller());
	app.use("/api/territory", territory_controller());
};

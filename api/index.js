const house_controller = require("./routers/house");

console.log("api loaded");

module.exports = (app) => {
	app.use("/api/house", house_controller());
};

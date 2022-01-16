const express = require("express");
const Temple = require("../../models/temples");

console.log("temple loaded");

module.exports = function () {

	const router = express.Router();

	router.get("/", async (req, res) => {

		let temples = await Temple.find_all();

		if (!temples) {
			return res.status(500).send("something went wrong.");
		}

		if (temples.length == 0) {
			return res.status(404).send("temple not found.");
		}

		return res.status(200).json(temples);
	});

	router.get("/test", async (req, res) => {
		let temples = await Temple.test();

		if (!temples) {
			return res.status(500).send("something went wrong.");
		}

		if (temples.length == 0) {
			return res.status(404).send("temple not found.");
		}

		return res.status(200).json(temples);
	});

	return router;
}

const express = require("express");
const Territory = require("../../models/territory");

console.log("territory loaded");

module.exports = function () {

	const router = express.Router();

	router.get("/graph_test", async (req, res) => {
		let data = req.body;
		let territory = await Territory.test();

		if (!territory) {
			return res.status(500).send("something went wrong.");
		}

		if (territory.length == 0) {
			return res.status(404).send("house not found.");
		}

		return res.status(200).json(territory);
	})

	router.post("/graph", async (req, res) => {
		console.log("request", req.body);
		let data = req.body;
		let territory = await Territory.get(data);

		if (!territory) {
			return res.status(500).send("something went wrong.");
		}

		if (territory.length == 0) {
			return res.status(404).send("house not found.");
		}

		return res.status(200).json(territory);
	})

	return router;
}

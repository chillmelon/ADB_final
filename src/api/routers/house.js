const express = require("express");
const Houses = require("../../models/houses");

console.log("house loaded");

module.exports = function () {

	const router = express.Router();

	router.get("/test", async (req, res) => {
		let data = req.body;
		let houses = await Houses.test();

		if (!houses) {
			return res.status(500).send("something went wrong.");
		}

		if (houses.length == 0) {
			return res.status(404).send("house not found.");
		}

		return res.status(200).json(houses);
	})

	router.post("/", async (req, res) => {
		console.log("request", req.body);
		let data = req.body;
		let houses = await Houses.get(data);

		if (!houses) {
			return res.status(500).send("something went wrong.");
		}

		if (houses.length == 0) {
			return res.status(404).send("house not found.");
		}

		return res.status(200).json(houses);
	})

	return router;
}

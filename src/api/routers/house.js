const express = require("express");
const House = require("../../models/houses");
const Temple = require("../../models/temples");

console.log("house loaded");

module.exports = function () {

	const router = express.Router();

	router.get("/test", async (req, res) => {
		let data = req.body;
		let houses = await House.test();

		if (!houses) {
			return res.status(500).send("something went wrong.");
		}

		if (houses.length == 0) {
			return res.status(404).send("house not found.");
		}

		return res.status(200).json(houses);
	})

	router.post("/", async (req, res) => {
		let building_type = [0, 1, 2, 3, 4, 5, 6, 7];
		let parking_type = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		let data = req.body;

		if (data.building_type == null) {
			data.building_type = building_type;
		}

		if (data.parking_type == null) {
			data.parking_type = parking_type;
		}

		let houses = [];
		let temples = [];

		if (data.god) {
			houses = await House.get_by_god(data);
			temples = await Temple.get_by_god(data);
		} else {
			houses = await House.get(data);
		}

		if (!houses) {
			return res.status(500).send("something went wrong.");
		}

		if (houses.length == 0) {
			return res.status(404).send("house not found.");
		}

		result = {
			"houses": houses,
			"temples": temples
		};
		return res.status(200).json(result);
	})

	return router;
}

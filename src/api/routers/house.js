const express = require("express");
const Houses = require("../../models/houses");

console.log("house loaded");

module.exports = function () {
	const router = express.Router();

	router.get("/test", async (req, res) => {
		let data = req.body;
		let houses = await Houses.test();
		return res.status(200).json(houses);
	})

	router.post("/", async (req, res) => {
		let data = req.body;
		let houses = await Houses.get(data);
		return res.json(houses);
	})

	return router;
}

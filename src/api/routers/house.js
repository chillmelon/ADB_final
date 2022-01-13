const express = require("express");
const Houses = require("../../models/houses");

console.log("house loaded");

module.exports = function () {
	const router = express.Router();

	router.get('/', async (req, res) => {
		let houses = await Houses.get();
		return res.json(houses);
	})

	return router;
}

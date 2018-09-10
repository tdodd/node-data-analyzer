import * as express from "express";

export class Router {
	private router = express.Router();

	constructor() {}

	// api/v1/classification
	router.post("/", (req, res, next) => {
		res.json({ response: "Hello World" });
	});

}

import { Engine } from "../../src/engine/engine";
import { FileService } from "../../src/utils/file-service";

import * as path from "path";
import { expect } from "chai";

describe("Engine", () => {

	it("Should create a dataset", async () => {
		let engine = new Engine();
		let dataPath = path.join(__dirname, "../data/TitanicSurvival.csv");
		let rawTestData = await FileService.readDataset(dataPath);
		let dataset = engine.createDataset("Titanic", rawTestData);
		expect(dataset.getFields()).to.have.lengthOf(6);
	});

	it("Should get field countDistinct", () => {
		let engine = new Engine();

		// No fields
		expect(engine.getCountDistinct([])).to.equal(0);

		// Some identical fields
		expect(engine.getCountDistinct(["a", "b", "a", "a", "c", "c"])).to.equal(3);

		// No identical fields
		expect(engine.getCountDistinct(["a", "b", "c", "d", "e"])).to.equal(5);

		// All indentical fields
		expect(engine.getCountDistinct(["a", "a", "a", "a"])).to.equal(1);
	});

	it("Should get field density");

	it("Should get field datatype");

	it("Should get field empty row count", () => {
		let engine = new Engine();

		// No fields
		expect(engine.getEmptyRowCount([])).to.equal(0);

		// Some empty fields
		let fruits = ["", "", "apples", "bananas", null, "oranges", undefined];
		expect(engine.getEmptyRowCount(fruits)).to.equal(4);

		// All empty fields
		expect(engine.getEmptyRowCount([null, "", "", "", null, ""])).to.equal(6);
	});

});

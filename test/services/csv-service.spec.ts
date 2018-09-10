import { CsvService } from "../../src/utils/csv-service";
import { FileService } from "../../src/utils/file-service";

import { expect } from "chai";
import * as path from "path";

describe("CsvService", () => {
	let testData: string;

	before(async () => {
		const dataPath = path.join(__dirname, "../data/TitanicSurvival.csv");
		testData = await FileService.readDataset(dataPath);
	});

	it("Should extract dataset headers", async () => {
		const expectedHeaders = ["lastName", "firstName", "survived", "sex", "age", "passengerClass"];
		const actualHeaders = CsvService.getFieldNames(testData);
		expect(actualHeaders).to.deep.equal(expectedHeaders);
	});

	it("Should retrieve data for a single column", () => {
		// Retrieve the first column
		let expectedNames = ["Allen", "Allison", "Allison", "Allison", "Allison"];
		let firstCol = CsvService.getColumnData(testData, [0]);
		let actualNames = firstCol[0].slice(0, 5);
		expect(actualNames).to.deep.equal(expectedNames);

		// Retrieve the middle column
		let expectedSurvival = ["yes", "yes", "no", "no", "no"];
		let thirdCol = CsvService.getColumnData(testData, [2]);
		let actualSurvival = thirdCol[0].slice(0,5);
		expect(actualSurvival).to.deep.equal(expectedSurvival);

		// Retrieve the last column
		let expectedClasses = ["1st", "1st", "1st", "1st", "1st"];
		let lastCol = CsvService.getColumnData(testData, [5]);
		let actualClasses = lastCol[0].slice(0, 5);
		expect(actualClasses).to.deep.equal(expectedClasses);
	});

	it("Should retrieve data for multiple columns", () => {
		// Retrieve the first and last columns
		let expectedData = [
			["Allen", "Allison", "Allison", "Allison", "Allison"],
			["1st", "1st", "1st", "1st", "1st"]
		];

		let firstAndLastCols = CsvService.getColumnData(testData, [0, 5]);
		let actualData = firstAndLastCols.map(col => col.slice(0, 5));
		expect(actualData).to.deep.equal(expectedData);
	});

	it("Should throw an error when retrieving a column that is out of range", () => {
		let negativeIndex = () => { CsvService.getColumnData(testData, [-1]); };
		let outOfBoundsIndex = () => { CsvService.getColumnData(testData, [6]); };
		expect(negativeIndex).to.throw();
		expect(outOfBoundsIndex).to.throw();
	});

});

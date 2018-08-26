import { FileService } from "../../src/utils/file-service";

import { expect } from "chai";
import * as path from "path";

describe("File Service", () => {

	it("Should read a csv file and return the headers", async () => {
		const headers = ["name", "age", "salary", "email"];
		const csv = path.join(__dirname, "./data/headers.csv");
		const response = await FileService.getColumnNames(csv);
		expect(response).to.deep.equal(headers);
	});

});

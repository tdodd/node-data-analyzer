import { Dataset } from "./dataset";
import { Field } from "./field";
import { CsvService } from "../utils/csv-service";

import * as _ from "underscore";

enum DATA_TYPES {
	STRING = "string",
	NUMBER = "number",
	BOOLEAN = "boolean",
	MIXED = "mixed"
}

export class Engine {

	constructor() {}

	public createDataset(name: string, rawDataset: string): Dataset {
		let dataset = new Dataset(name);

		// Get fields and add them to the dataset
		CsvService.getFieldNames(rawDataset).forEach((fieldName, index) => {
			dataset.addField(this.populateField(fieldName, index, rawDataset));
		});

		return dataset;
	}

	private populateField(fieldName: string, index: number, rawDataset: string): Field {
		let field = new Field(fieldName);

		// Get the individual rows for this field
		let rawFieldData = CsvService.getColumnData(rawDataset, [index]);


		// Set count and countDistinct
		let count = rawFieldData[0].length;
		let countDistinct = this.getCountDistinct(rawFieldData[0]);

		field.setCount(count);
		field.setCountDistinct(countDistinct);

		// Set the datatype
		let datatype = this.getDatatype(rawFieldData[0]);
		field.setDatatype(datatype);

		// Set the field density
		let emptyRowCount = this.getEmptyRowCount(rawFieldData[0]);
		let density = count / (count - emptyRowCount);
		field.setDensity(density);

		return field;
	}

	public getCountDistinct(rawFieldData: string[]): number {
		return _.uniq(rawFieldData).length;
	}

	public getDatatype(rawFieldData: string[]): string {
		let types: string[] = [];

		rawFieldData.forEach(row => {
			let type = typeof(row);
			if (!types.includes(type)) types.push(type);
		});

		if (types.length !== 1) return DATA_TYPES.MIXED;

		switch (types[0]) {
			case "string":
				return DATA_TYPES.STRING;
			case "number":
				return DATA_TYPES.NUMBER;
			case "boolean":
				return DATA_TYPES.BOOLEAN;
		}
	}

	public getEmptyRowCount(rawFieldData: string[]): number {
		return rawFieldData.reduce((total: number, name: string) => {
			return (!name || name === "") ? ++total: total;
		}, 0);
	}
}

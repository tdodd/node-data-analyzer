import { Utils } from "./utils";

export class CsvService {

	/**
	 * Get the column header names from a given dataset
	 * @param {string} path the path to the csv file
	 * @return {string[]} an array of field header names
	 */
	public static getColumnNames(dataset: string): string[] {
		return Utils.trim(dataset.split('\n')[0].split(","));
	}

	/**
	 * Get data for the column(s) specified
	 * @param {string} dataset the dataset to use
	 * @param {number} indices the column indices
	 */
	public static getColumnData(dataset: string, indices: number[]): string[][] {
		let columnData: string[][] = [];

		// Cache the rows, ignoring the headers
		let rows = dataset.split("\n").slice(1);
		let numCols = rows[0].split(",").length;

		indices.forEach((index: number) => {
			// Check for out of range index
			if (index < 0 || index >= numCols) {
				throw new Error(`Column index ${index} out of range!`);
			}

			// Push the ith non-empty column value
			let nonEmptyRows = rows.filter((row: string) => row !== "");
			columnData.push(nonEmptyRows.map((row: string) => row.split(",")[index].trim()));
		});

		return columnData;
	}

}

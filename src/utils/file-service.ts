import * as fs from "fs";
import * as Promise from "bluebird";

export class FileService {

	public static readDataset(path: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.readFile(path, "utf8", (err: Error, data: string) => {
				if (err) reject(err);
				resolve(data);
			});
		});
	}

}

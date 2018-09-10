import * as os from "os";
import * as _ from "underscore";

export class Utils {

	/**
	 * Get the fully qualified host name
	 */
	public static getHostAddress(): string {
		let interfaces = os.networkInterfaces();
		let localIPv4: string;

		Object.keys(interfaces).forEach(key => {
			let iface = interfaces[key];
			let matchCriteria = { family: "IPv4", internal: true };
			let found = _.findWhere(iface, matchCriteria);

			if (found) {
				localIPv4 = found.address;
			}
		});

		return localIPv4;
	}

	/**
	 * Trim whitespace for columns
	 * @param {string[]} cols the cols to trim
	 * @return {string[]} the trimmed cols
	 */
	public static trim(cols: string[]): string[] {
		return cols.map(col => col.trim());
	}

}

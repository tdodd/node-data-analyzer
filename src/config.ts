import { Utils } from "./utils/utils";

/**
 * Information about the server's configuration
 */
export class Config {

	private _port: number;
	private _mode: string;
	private _host: string;

	constructor(port?: number, mode?: string) {
		this._port = port;
		this._mode = mode;
		this._host = Utils.getHostAddress();
	}

	public static MODES = {
		DEVELOPMENT: "development",
		PRODUCTION: "production"
	};

	public getPort(): number {
		return this._port;
	}

	public setPort(port: number): void {
		this._port = port;
	}

	public getMode(): string {
		return this._mode;
	}

	public setMode(mode: string): void {
		this._mode = mode;
	}

	public getHost(): string {
		return this._host;
	}

}

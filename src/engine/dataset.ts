import { Field } from "./field";


export class Dataset {
	private _fields: Field[];
	private _name: string;

	constructor(name: string) {
		this._name = name;
		this._fields = [];
	}

	public getName(): string { return this._name; }
	public setName(name: string): void { this._name = name; }

	public getFields(): Field[] { return this._fields; }
	public addField(field: Field): void { this._fields.push(field); }
}

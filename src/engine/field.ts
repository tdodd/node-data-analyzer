
export class Field {
	private _name: string;
	private _density: number;
	private _datatype: string;
	private _countDistinct: number;
	private _count: number;

	constructor(name: string) { this._name = name; }

	public getName(): string { return this._name; }
	public setName(name: string): void { this._name = name; }

	public getDensity(): number { return this._density; }
	public setDensity(density: number): void { this._density = density; }

	public getDatatype(): string { return this._datatype; }
	public setDatatype(datatype: string): void { this._datatype = datatype; }

	public getCountDistinct(): number { return this._countDistinct; }
	public setCountDistinct(count: number): void { this._countDistinct = count; }

	public getCount(): number { return this._count; }
	public setCount(count: number): void { this._count = count; }
}

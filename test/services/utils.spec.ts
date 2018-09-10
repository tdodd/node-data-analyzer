import { Utils } from "../../src/utils/utils";

import { expect } from "chai";

describe("Utils", () => {

	it("Should get the host machine's IP address", () => {
		let hostname = Utils.getHostAddress();
		expect(hostname).to.equal("127.0.0.1");
	});

});

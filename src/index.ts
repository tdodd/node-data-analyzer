import { Server } from "./server";
import { Config } from "./config";

import * as process from "process";
import * as _ from "underscore";

// Read input from command line
const args = process.argv.slice(2);
const port = args.find(arg => arg.includes("port")).split("=")[1];
const mode = args.find(arg => arg.includes("mode")).split("=")[1];

const config = new Config();
config.setPort(parseInt(port));
config.setMode(mode);

// Start the server
console.log(`Server listening on port ${port} in ${mode} mode..`);

const server = new Server(config);
server.listen();

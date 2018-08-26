import { Server } from "./server";
import { Config } from "./config";

import * as process from "process";

// Read input from command line
const args = process.argv;
const port = args[2].split("=")[1];
const mode = args[3].split("=")[1];

const config = new Config();
config.setPort(port);
config.setMode(mode);

// Start the server
console.log(`Server listening on port ${port} in ${mode} mode..`);

const server = new Server(config);
server.listen();


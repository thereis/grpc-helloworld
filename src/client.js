import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";

import { argv } from "yargs";

import signale from "signale";
import _ from "lodash";

const init = async (ip, port) => {
  try {
    // Load proto file
    let packageDefinition = protoLoader.loadSync(
      __dirname + "/data/grpc.proto"
    );

    // Initialize package service
    let packageService = grpc.loadPackageDefinition(packageDefinition)
      .HelloWorld;

    // Creates a new connection to master
    let client = new packageService.Cumprimentar(
      `${ip}:${port}`,
      grpc.credentials.createInsecure()
    );

    // Connecting to masterserver message
    signale.info(`Connecting to: ${ip}:${port}`);

    // Handle rpc service
    client.EnviarCumprimento({ username: "Lucas" }, (error, response) => {
      let message = response.message;
      console.log("message: ", message);
    });
  } catch (e) {
    signale.error(e.message);
  }
};

signale.info("Initializing...");
setTimeout(() => {
  try {
    /**
     * Check if arguments have been passed
     */
    let ip = argv.ip,
      port = argv.port;

    if (!ip || !port)
      throw new Error(
        "You need to use the --ip and --port flag to initialize the agent."
      );
    if (ip === "" || port === true)
      throw new Error("Provide a value to ip and port.");

    // Initialize the application
    init(ip, port);
  } catch (e) {
    signale.error(e.message);
  }
}, 1000);

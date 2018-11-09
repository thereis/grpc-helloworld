import ip from "ip";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";

import signale from "signale";

import _ from "lodash";

// Load proto file
let packageDefinition = protoLoader.loadSync(__dirname + "/data/grpc.proto");

// Initialize package service
let packageService = grpc.loadPackageDefinition(packageDefinition).HelloWorld;

// Initialize the server
const startServer = () => {
  const server = new grpc.Server();

  // Create a instance of server and then create the service reference
  server.addService(packageService.Cumprimentar.service, {
    EnviarCumprimento: enviarCumprimento
  });

  // Bind to the internal + external addresses
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  // Start the server
  signale.start(`Server is up! IP: ${ip.address()} Port: 50051`);

  // The EnviarCumprimento function
  function enviarCumprimento(call, callback) {
    // Sends a message to user
    let message = `Olá ${call.request.username}, seja bem vindo!`;
    callback(null, { message: message });
  }
};

const init = async () => {
  signale.info("Initializing server...");
  startServer();
};

init();

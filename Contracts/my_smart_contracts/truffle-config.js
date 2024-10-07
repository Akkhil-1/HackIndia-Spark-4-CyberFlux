const path = require('path');
const solc = require('solc');

module.exports = {
  contracts_build_directory: path.join(__dirname, "build/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" 
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
      docker: false,
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    }
  }
};

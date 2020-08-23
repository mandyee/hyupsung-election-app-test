const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten:{
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.REMOTE_NODE)
      },
      network_id: 3,
      from: process.env.ADDRESS,
      gas: 4700000
    }
  }
};

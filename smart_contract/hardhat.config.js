require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// 0x224fB180f46882C41F1f23Fb8b884bdB30ED7859

module.exports = {
  solidity: "0.8.7",
  networks: {
    ropsten: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: process.env.ETHERSCAN_API
   }
};

// npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
// npm install @openzeppelin/contracts
// npx hardhat test
// npx hardhat compile
// npx hardhat run--network ropsten scripts / deploy.js  
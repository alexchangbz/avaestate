require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// 0x0e3D00A1c3ee7B7E12E37E83E6544a79fC7BaEc5

module.exports = {
  solidity: "0.8.7",
  networks: {
    ropsten: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};

// npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
// npm install @openzeppelin/contracts
// npx hardhat test
// npx hardhat compile
// npx hardhat run--network ropsten scripts / deploy.js  
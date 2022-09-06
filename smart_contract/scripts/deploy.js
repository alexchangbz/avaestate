const hre = require("hardhat");

async function main() {

  const AvaEstate = await hre.ethers.getContractFactory("AvaEstate");
  const avaestate = await AvaEstate.deploy();

  await avaestate.deployed();

  console.log("AvaEstate deployed to:", avaestate.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

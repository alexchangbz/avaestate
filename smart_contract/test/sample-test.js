const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AvaEstate", function () {
  it("Should return the new greeting once it's changed", async function () {
    const AvaEstate = await ethers.getContractFactory("AvaEstate");
    const avaestate = await AvaEstate.deploy();
    await avaestate.deployed();
  });
});


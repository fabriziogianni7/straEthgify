import { expect } from "chai";
import { ethers } from "hardhat";

describe("StrategyManager", function () {
  let strategyManager: any;

  it("Should deploy the contract", async function () {
    const StrategyManager = await ethers.getContractFactory("StrategyManager");
    strategyManager = await StrategyManager.deploy();
    await strategyManager.deployed();
});


});

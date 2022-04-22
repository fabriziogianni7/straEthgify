import { expect } from "chai";
import { ethers } from "hardhat";

describe("StrategyManager", function () {
  let strategyManager: any;
  const GEARBOX_ADDRESS_PROVIDER = '0xcF64698AFF7E5f27A11dff868AF228653ba53be0'

  it("Should deploy the contract", async function () {
    const StrategyManager = await ethers.getContractFactory("StrategyManager");
    strategyManager = await StrategyManager.deploy(
      GEARBOX_ADDRESS_PROVIDER
    );
    await strategyManager.deployed();
});


});

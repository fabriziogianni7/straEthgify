import { ethers } from "hardhat";

async function main() {
  const GEARBOX_ADDRESS_PROVIDER = '0xcF64698AFF7E5f27A11dff868AF228653ba53be0'
  const DATA_COMPRESSOR_ADDRESS = '0xcbd0ae32a74c7cbeb774a9a07ec744f4f53afd6d'
  
  const StrategyManager = await ethers.getContractFactory("StrategyManager");
  const strategyManager = await StrategyManager.deploy(
    GEARBOX_ADDRESS_PROVIDER,
    DATA_COMPRESSOR_ADDRESS
  );

  await strategyManager.deployed();

  console.log("StrategyManager deployed to:", strategyManager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

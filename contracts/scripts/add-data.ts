import { ethers } from "hardhat";
require('dotenv').config()

async function main() {

  const USDC_ADDRESS = '0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df'
  const USDC_AMOUNT = '100000000'
  const TIME_FRAME = 3600
  const WINDOW_SIZE = 100
  const CREDIT_MANAGER_ADDRESS_USDC = '0xdbad1361d9a03b81be8d3a54ef0dc9e39a1ba5b3'
  const YEARN_VAULT = '0x7de5c945692858cef922dad3979a1b8bfa77a9b4'
  const LEVERAGE_FACTOR = 2
  const UNI_V2_USDC_ADAPTER = '0x37c61fD2AFE4134d6020188C59Efdea3d143e28a'
  const WETH_ADDRESS = '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
  const STRATEGY_MANAGER_ADDRESS = '0xa47411eaf271ba536a00b84c5D1F94779e56044C'


  let privateKey = process.env.PRIVATE_KEY || "";
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  let owner = new ethers.Wallet(privateKey, provider);

  const usdcFactory = await ethers.getContractFactory("ERC20Upgradeable");
  const usdc = await usdcFactory.attach(USDC_ADDRESS)
  const strategyManagerFactory = await ethers.getContractFactory("StrategyManager");
  const strategyManager = await strategyManagerFactory.attach(STRATEGY_MANAGER_ADDRESS)
  await usdc.connect(owner).approve(strategyManager.address, USDC_AMOUNT)
  const allowance = await usdc.connect(owner).allowance(owner.address, strategyManager.address)
  const amount = await usdc.connect(owner).balanceOf(owner.address)

  console.log({ allowance })
  console.log({ amount })

  const tx = await strategyManager.connect(owner).createStrategy(
    CREDIT_MANAGER_ADDRESS_USDC,
    TIME_FRAME,
    WINDOW_SIZE,
    USDC_AMOUNT,
    USDC_ADDRESS,
    WETH_ADDRESS,
    UNI_V2_USDC_ADAPTER,
    YEARN_VAULT,
    LEVERAGE_FACTOR
  )

  console.log({ tx })
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

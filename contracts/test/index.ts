import { expect } from "chai";
import { ethers } from "hardhat";

describe("StrategyManager", function () {
  let strategyManager: any;
  const GEARBOX_ADDRESS_PROVIDER = '0xcF64698AFF7E5f27A11dff868AF228653ba53be0'
  const DATA_COMPRESSOR_ADDRESS = '0xcbd0ae32a74c7cbeb774a9a07ec744f4f53afd6d'
  const USDC_ADDRESS = '0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df'
  const USDC_AMOUNT = '500000000'
  const TIME_FRAME = 5000
  const WINDOW_SIZE = 100
  const CREDIT_MANAGER_ADDRESS_USDC = '0xdbad1361d9a03b81be8d3a54ef0dc9e39a1ba5b3'
  const YEARN_VAULT = '0xdbad1361d9a03b81be8d3a54ef0dc9e39a1ba5b3'
  const LEVERAGE_FACTOR = 2
  const UNI_V2_USDC_ADAPTER = '0x37c61fD2AFE4134d6020188C59Efdea3d143e28a'
  const WETH_ADDRESS = '0xd0A1E359811322d97991E03f863a0C30C2cF029C'

  it("Should deploy the contract", async function () {
    const StrategyManager = await ethers.getContractFactory("StrategyManager");
    strategyManager = await StrategyManager.deploy(
      GEARBOX_ADDRESS_PROVIDER,
      DATA_COMPRESSOR_ADDRESS
    );
    await strategyManager.deployed();
  });

  it("Should open the strategy", async function () {
    const [owner] = await ethers.getSigners();
    const usdcFactory = await ethers.getContractFactory("ERC20Upgradeable");
    const usdc = await usdcFactory.attach(USDC_ADDRESS)
    await usdc.connect(owner).approve(strategyManager.address, USDC_AMOUNT)
    await expect(strategyManager.connect(owner).createStrategy(
      CREDIT_MANAGER_ADDRESS_USDC,
      TIME_FRAME,
      WINDOW_SIZE,
      USDC_AMOUNT,
      USDC_ADDRESS,
      WETH_ADDRESS,
      UNI_V2_USDC_ADAPTER,
      YEARN_VAULT,
      LEVERAGE_FACTOR
    )).to.emit(strategyManager, 'StrategyOpened')
  });

  it("Should execute a rebalance to go risky", async function () {
    const [owner] = await ethers.getSigners();
    const strategyManagerInstance = strategyManager.connect(owner)
    const userVault = await strategyManagerInstance.getUserVault(owner.address)
    const userVaultAddress = userVault[1]
    await expect(strategyManager.connect(owner).rebalance(
      userVaultAddress,
      1
    )).to.emit(strategyManager, 'Rebalance')
  });

});

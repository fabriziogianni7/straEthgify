import { ethers } from "hardhat";

async function main() {
  const ADDRESS_PROVIDER_ADDRESS = '0xA526311C39523F60b184709227875b5f34793bD4'
  const addressProvider = await ethers.getContractAt("IAddressProvider", ADDRESS_PROVIDER_ADDRESS);
  const contractsRegisterAddress = await addressProvider.getContractsRegister()
  console.log(`Contracts register address provider is ${contractsRegisterAddress}`)

  const contractsRegister = await ethers.getContractAt("IContractsRegister", contractsRegisterAddress);
  const creditManagers = await contractsRegister.getCreditManagers()

  console.log('Credit manager address are: ')
  console.log(creditManagers)

  const pools = await contractsRegister.getPools()

  console.log('Pools manager address are: ')
  console.log(pools)

  const dataCompressor = await addressProvider.getDataCompressor()

  console.log('Data compressor address are: ')
  console.log(dataCompressor)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

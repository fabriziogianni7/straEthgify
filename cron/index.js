import axios from 'axios'
import { ethers } from "ethers";
import { addressToAsset } from './config.js';
import abiJson from './StrategyManager.json'

const contractAddress = process.env.contractAddress || '0x95b177facB33f81bddfDE6e9376F11d001bC726e'
const provider = new ethers.providers.JsonRpcProvider('https://eth-kovan.alchemyapi.io/v2/3eFnaqQhXc6AS9oQ6UQBh3j1wUt6-msV');
const wallet = new ethers.Wallet('0xe9b0203362f1a7c35310a7f4e566f247a9f17b335447fe599dfa848c1f00e376', provider);
const signer = wallet.provider.getSigner(wallet.address);

const strategyContract = new ethers.Contract(contractAddress, abiJson.abi, signer);
const users = await strategyContract.getAllUsers()
const userVaults = await Promise.all(users.map(async user => await strategyContract.getUserVault(user)))

const ethPricesResponse = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max&interval=seconds')
const btcPricesResponse = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=seconds')
const ethPrices = ethPricesResponse.data.prices.map(el => el[1])
const btcPrices = btcPricesResponse.data.prices.map(el => el[1])

const getAverageAndLatestPrice = (timeframe, size, asset) => {
    const relevantPrices = []
    for (let i = 0; i < timeframe * size; i = i + timeframe) {
        if (asset === 'btc') {
            relevantPrices.push(btcPrices[i])
        } else {
            relevantPrices.push(ethPrices[i])
        }
    }

    return { average: relevantPrices.reduce((acc, curr) => acc + curr) / size, lastPrice: relevantPrices.slice(-1) }
}
await Promise.all(userVaults.map(async user => {
    const userVaultAddress = user[1]
    const timeframe = parseInt(user[2]._hex, 16) / 3600
    const size = parseInt(user[3]._hex, 16)
    const asset = addressToAsset[user[4]]
    const { average, lastPrice } = getAverageAndLatestPrice(timeframe, size, asset)
    let direction
    if (average <= lastPrice) {
        direction = 1
    } else {
        direction = 0
    }

    const response = await strategyContract.rebalance(userVaultAddress, direction)
    console.log(await response.wait())
}))

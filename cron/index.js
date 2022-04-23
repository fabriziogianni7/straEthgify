import axios from 'axios'
import { ethers } from "ethers";
import { addressToAsset } from './config.js';
import abiJson from './StrategyManager.json'

const contractAddress = process.env.contractAddress || '0x53B551F2d4eC25e566de1D174509df3F7baB6c51'
const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();

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

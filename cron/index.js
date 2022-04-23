import axios from 'axios'
import { ethers } from "ethers";
import { addressToAsset, abiJson } from './config.js';
import dotenv from 'dotenv'
dotenv.config()

const contractAddress = process.env.CONTRACT_ADDRESS || '0x95b177facB33f81bddfDE6e9376F11d001bC726e'
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API);
const wallet = new ethers.Wallet(process.env.WALLET_PK, provider);
const walletSigner = wallet.connect(provider)

const strategyContract = new ethers.Contract(contractAddress, abiJson.abi, walletSigner);
const users = await strategyContract.getAllUsers()
const userVaults = await Promise.all(users.map(async user => await strategyContract.getUserVault(user)))

const ethPricesResponse = await axios.get(process.env.API_ENDPOINT_ETH)
const btcPricesResponse = await axios.get(process.env.API_ENDPOINT_BTC)
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

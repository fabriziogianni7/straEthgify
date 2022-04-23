import axios from 'axios'
import Web3 from 'web3'
import { addressToAsset } from './config.js';
import abiJson from './StrategyManager.json'
const contractAddress = process.env.contractAddress || '0xDE4eC895872d6889d03Bb7F6a08a0Ff19D8FFb5D'
const web3 = new Web3("http://localhost:8545");
const strategyContract = new web3.eth.Contract(abiJson.abi, contractAddress)
const users = await strategyContract.methods.getAllUsers().call()
console.log(users)
const userVaults = await Promise.all(users.map(async user => await strategyContract.methods.getUserVault(user).call()))
console.log(userVaults)
const ethPricesResponse = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max&interval=seconds')
const btcPricesResponse = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=seconds')
const ethPrices = ethPricesResponse.data.prices.map(el => el[1])
const btcPrices = btcPricesResponse.data.prices.map(el => el[1])
console.log('eth', ethPrices.length)
console.log('btc', btcPrices.length)

const calculateAverage = (timeframe, size, asset) => {
    const relevantPrices = []
    for (let i = 0; i < timeframe * size; i = i + timeframe) {
        if (asset === 'btc') {
            relevantPrices.push(btcPrices[i])
        } else {
            relevantPrices.push(ethPrices[i])
        }
    }

    console.log({timeframe, size, asset})
    return { average: relevantPrices.reduce((acc, curr) => acc + curr) / size, lastPrice: relevantPrices.slice(-1) }
}
await Promise.all(userVaults.map(async user => {
    console.log(user[4])
    const userAddress = user[0]
    const userVaultAddress = user[1]
    const timeframe = Number(user[2]) / 3600
    const size = Number(user[3])
    const asset = addressToAsset[user[4]]
    const { average, lastPrice } = calculateAverage(timeframe, size, asset)
    let direction
    if (average <= lastPrice) {
        direction = 1
    } else {
        direction = 0
    }

    const nonce = await web3.eth.getTransactionCount('0x058B7Db751733178FE08721E558825c33f9ff29B', 'latest');

    const data = strategyContract.methods.rebalance(userVaultAddress, direction).encodeABI()
    const gas =  await web3.eth.estimateGas({
        to: contractAddress,
        data
    })
    const transaction = {
        from: '0x058B7Db751733178FE08721E558825c33f9ff29B',
        'to': contractAddress,
        'value': 100,
        gas,
        data
    };
    console.log({data})

    console.log('priv', process.env.PRIVATE_KEY)
    const signedTx = await web3.eth.accounts.signTransaction(transaction, `0xe9b0203362f1a7c35310a7f4e566f247a9f17b335447fe599dfa848c1f00e376`);
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {

        if (!error) {

            console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");

        } else {

            console.log("❗Something went wrong while submitting your transaction:", error)

        }

    });
}))

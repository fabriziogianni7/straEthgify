import { useMemo, useState } from "react";
import { GeneralContext } from "./index"
import strategyManagerJson from '../contracts/StrategyManager.json'
import usdcContractJson from '../contracts/USDCContract.json'
import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { STRATEGY_CONTRACT_ADDRESS, USDC_ADDRESS, USDC_AMOUNT } from "../config";

declare var window: any

export function GeneralContextProvider(props: any) {
    const web3 = new Web3(window.ethereum)
    const [account, setAccount] = useState('')
    const [dateBacktest, setDateBacktest] = useState('2021-04-22')
    const [timeFrameBacktest, setTimeFrameBacktest] = useState(0)
    const [leverageFactor, setLeverageFactor] = useState(0)
    const [windowSize, setWindowSize] = useState(10)
    const [assetAmount, setAssetAmount] = useState(10000)
    const [assetBacktest, setAssetBacktest] = useState('bitcoin')
    const ctx = {
        test: () => alert("ctx is ok"),
        callTestStrategy: async (testParams: any) => alert("todo: call test strategy api call"),
        callDeployStrategy: async (params: any) => alert("todo: call deploy strategy api call"),
        checkMetamask: () => {
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask is installed!');
                return true
            }
            return false
        },
        account,
        dateBacktest,
        timeFrameBacktest,
        leverageFactor,
        windowSize,
        assetAmount,
        assetBacktest,
        setDateBacktest,
        setTimeFrameBacktest,
        setLeverageFactor,
        setWindowSize,
        setAssetAmount,
        setAssetBacktest,
        getAccounts: async () => {
            console.log((await window.ethereum.request({ method: 'eth_requestAccounts' }))[0])
            ctx.account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
        },
        connectMetamask: async () => {
            console.log('inside metamask')
            ctx.account = await window.ethereum.request({ method: 'eth_requestAccounts' })
        },
        strategyManagerContract: () => new web3.eth.Contract(strategyManagerJson.abi as AbiItem[], STRATEGY_CONTRACT_ADDRESS),
        approveStrategyContract: async () => {
            const usdcContract = new web3.eth.Contract(usdcContractJson as AbiItem[], USDC_ADDRESS)

            const tx = await usdcContract.methods.approve(STRATEGY_CONTRACT_ADDRESS, USDC_AMOUNT)

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0])

            const gas = await web3.eth.estimateGas({
                from: accounts[0],
                to: USDC_ADDRESS,
                data: tx.encodeABI()
            })

            const transactionParameters = {
                // gas: '100000', // customizable by user during MetaMask confirmation.
                // gas: String(gas), // customizable by user during MetaMask confirmation.
                to: USDC_ADDRESS,  // Required except during contract publications.
                from: accounts[0], // must match user's active address.
                data: tx.encodeABI(), // Optional, but used for defining smart contract creation and interaction.
            };

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log("txHash", txHash)
        },
        createStrategy: async (
            creditManagerAddress: any,
            timeframe: any,
            windowSize: any,
            usdcAmount: any,
            usdcAddress: any,
            wethAddress: any,
            uniV2UsdcAdapter: any,
            yearnVault: any,
            leverageFactor: any,
        ) => {
            await ctx.approveStrategyContract()
            const tx = await ctx.strategyManagerContract().methods.createStrategy(
                creditManagerAddress,
                timeframe,
                windowSize,
                usdcAmount,
                usdcAddress,
                wethAddress,
                uniV2UsdcAdapter,
                yearnVault,
                leverageFactor,
            )

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0])

            const gas = await web3.eth.estimateGas({
                from: accounts[0],
                to: STRATEGY_CONTRACT_ADDRESS,
                data: tx.encodeABI()
            })

            const transactionParameters = {
                to: STRATEGY_CONTRACT_ADDRESS,  // Required except during contract publications.
                from: accounts[0], // must match user's active address.
                data: tx.encodeABI(), // Optional, but used for defining smart contract creation and interaction.
            };


            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log("txHash", txHash)
            if(txHash){
                alert('Strategy Is succesfully Deployed')
            }else{
                alert('Error in deploying the strategy')

            }

            // const signAndSendTransaction = async (tx) => {
            // const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            // console.log("SENDED TRANSACTION!!")
            // console.log(signedTx.rawTransaction)
            // return web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
            // // }

            // console.log("txHash", txHash)


        },
        getCreditAccountData: async () => {
            const tx = await ctx.strategyManagerContract().methods.getCreditAccountData(ctx.account).call()
            ctx.creditAccountData = tx
        },
        creditAccountData: ''

    }

    useMemo(async () => {
        await ctx.getAccounts()
        await ctx.getCreditAccountData()
    }, [])


    return <GeneralContext.Provider value={ctx}>
        {props.children}
    </GeneralContext.Provider>

}


import { useEffect, useMemo } from "react";
import { GeneralContext } from "./index"
import strategyManagerJson from '../contracts/StrategyManager.json'
import usdcContractJson from '../contracts/USDCContract.json'
import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { STRATEGY_CONTRACT_ADDRESS, USDC_ADDRESS, USDC_AMOUNT } from "../config";
import { createTextSpanFromBounds } from "typescript";

declare var window: any

export function GeneralContextProvider(props: any) {
    const web3 = new Web3("http://localhost:8545")

    // const STRATEGY_CONTRACT_ADDRESS = '0xE862e9E0aae009F75950181C418981527881835c'

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
        account: '',
        getAccounts: async () => {
            console.log((await window.ethereum.request({ method: 'eth_requestAccounts' }))[0])
            ctx.account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
        },
        connectMetamask: async () => {
            console.log('inside metamask')
            ctx.account = await window.ethereum.request({ method: 'eth_requestAccounts' })
            // return ctx.accountConnected
            // console.log("cccc", ctx.accountConnected)
        },
        strategyManagerContract: () => new web3.eth.Contract(strategyManagerJson.abi as AbiItem[], STRATEGY_CONTRACT_ADDRESS),
        approveStrategyContract: async () => {
            // console.log(await ctx.strategyManagerContract())

            const usdcContract = new web3.eth.Contract(usdcContractJson as AbiItem[], USDC_ADDRESS)

            const tx = await usdcContract.methods.approve(STRATEGY_CONTRACT_ADDRESS, USDC_AMOUNT)

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0])

            const gas = await web3.eth.estimateGas({
                from: accounts[0],
                to: USDC_ADDRESS,
                data: tx.encodeABI()
            })

            // console.log('ctx.accountConnected()', (ctx.account))
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

            console.log('which one is the transaction?', tx)
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0])

            const gas = await web3.eth.estimateGas({
                from: accounts[0],
                to: STRATEGY_CONTRACT_ADDRESS,
                data: tx.encodeABI()
            })

            const transactionParameters = {
                // gas: '1000000', // customizable by user during MetaMask confirmation.
                // gas: String(gas), // customizable by user during MetaMask confirmation.
                to: STRATEGY_CONTRACT_ADDRESS,  // Required except during contract publications.
                from: accounts[0], // must match user's active address.
                data: tx.encodeABI(), // Optional, but used for defining smart contract creation and interaction.
            };



            // txHash is a hex string
            // As with any RPC call, it may throw an error
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log("txHash", txHash)

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


        // console.log("ABI", strategyManagerJson.abi)

        // console.log("strategyManagerContract",strategyManagerContract)
        // ctx.strategyManagerContract = strategyManagerContract
    }, [])


    return <GeneralContext.Provider value={ctx}>
        {props.children}
    </GeneralContext.Provider>

}


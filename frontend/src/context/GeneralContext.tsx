import { useEffect, useMemo } from "react";
import { GeneralContext } from "./index"
import strategyManagerJson from '../contracts/StrategyManager.json'
import Web3 from 'web3';
import { AbiItem } from "web3-utils";

declare var window: any

export function GeneralContextProvider(props: any) {
    const web3 = new Web3("http://localhost:8545")

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
        accountConnected: '',
        connectMetamask: async () => {
            console.log('inside metamask')
            ctx.accountConnected = await window.ethereum.request({ method: 'eth_requestAccounts' })
            // return ctx.accountConnected
        },
        strategyManagerContract: () => new web3.eth.Contract(strategyManagerJson.abi as AbiItem[], '0xC423bDffF27e64E84a661168b2D75964e34552F8'),
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

           const gas =  await web3.eth.estimateGas({
                to: '0xE94Bd373eB4e095E5b3AfAe7495f9cc6474b2FB9',
                data: tx.encodeABI()
              })
              console.log("gas",gas)

            // const baseFee = await web3.eth.getBlock("pending");
            // console.log('baseFee', baseFee)
            // console.log('gasPrice', await web3.eth.getGasPrice())
            // console.log('chainId', await web3.eth.getChainId())
            const transactionParameters = {
                gas: String(gas), // customizable by user during MetaMask confirmation.
                to: '0x6dDFFB72e5b805629E8375De6a5E0Da1c3a0854A', // Required except during contract publications.
                from: '0xE94Bd373eB4e095E5b3AfAe7495f9cc6474b2FB9', // must match user's active address.
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


        }


    }

    useMemo(() => {
        // ctx.checkMetamask()

        // console.log("ABI", strategyManagerJson.abi)

        // console.log("strategyManagerContract",strategyManagerContract)
        // ctx.strategyManagerContract = strategyManagerContract
    }, [])


    return <GeneralContext.Provider value={ctx}>
        {props.children}
    </GeneralContext.Provider>

}


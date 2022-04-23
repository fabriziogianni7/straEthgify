import React from "react";

export const GeneralContext = React.createContext({
    test: () => {},
    callTestStrategy: async (testParams:any)=>{},
    callDeployStrategy: async (params: any)=>{},
    checkMetamask: () =>{},
    connectMetamask: async () =>{},
    accountConnected: '' as string,
    strategyManagerContract:()=> {},
    createStrategy: async (
        creditManagerAddress:any,
        timeframe:any,
        windowSize:any,
        usdcAmount:any,
        usdcAddress:any,
        wethAddress:any,
        uniV2UsdcAdapter:any,
        yearnVault:any,
        leverageFactor:any,
        )=> {}
})
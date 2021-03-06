import React from "react";

export const GeneralContext = React.createContext({
    test: () => {},
    callTestStrategy: async (testParams:any)=>{},
    callDeployStrategy: async (params: any)=>{},
    checkMetamask: () =>{},
    connectMetamask: async () =>{},
    account: '' as string,
    dateBacktest: '' as string,
    timeFrameBacktest: 0 as number,
    leverageFactor: 0 as number,
    windowSize: 0 as number,
    assetAmount: 0 as number,
    assetBacktest: '' as string,
    getAccounts: async () =>{},
    setDateBacktest: (date:string) =>{},
    setTimeFrameBacktest: (amount:number) =>{},
    setLeverageFactor: (amount:number) =>{},
    setWindowSize: (amount:number) =>{},
    setAssetAmount: (amount:number) =>{},
    setAssetBacktest: (asset:string) => {},
    setCreditAccountData: (data:any) => {},
    strategyManagerContract:()=> {},
    approveStrategyContract:async () =>{},
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
        )=> {},
    getCreditAccountData: async () : Promise<any> =>{} ,
    creditAccountData: '' as any
})

import { useEffect, useMemo } from "react";
import { GeneralContext } from "./index"
declare var window: any

export function GeneralContextProvider(props: any) {



    const ctx = {
        test: () => alert("ctx is ok"),
        callTestStrategy: async (testParams: any) => alert("todo: call test strategy api call"),
        callDeployStrategy: async (params: any) => alert("todo: call deploy strategy api call"),
        checkWeb3Provider: () => {
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
    }

    useMemo(() => ctx.checkWeb3Provider(), [])


    return <GeneralContext.Provider value={ctx}>
        {props.children}
    </GeneralContext.Provider>

}


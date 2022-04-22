import { GeneralContext } from "./index"

export function GeneralContextProvider(props:any) {

    const ctx = {
        test: () => alert("context stateee"),
        callTestStrategy: async (testParams:any) => alert("todo: call test strategy api call"),
        callDeployStrategy: async (params:any) => alert("todo: call deploy strategy api call")
    }
        return  <GeneralContext.Provider value={ctx}> 
                {props.children}
            </GeneralContext.Provider>
        
    }
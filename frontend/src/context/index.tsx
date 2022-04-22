import React from "react";

export const GeneralContext = React.createContext({
    test: () => {},
    callTestStrategy: async (testParams:any)=>{},
    callDeployStrategy: async (params: any)=>{}
})
import { Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react"
import { ADDRESS_TOKEN_MAPPING } from "../config";
import { GeneralContext } from '../context/index';
export default function Balances() {

  const { creditAccountData, getCreditAccountData } = useContext(GeneralContext)

  const [x, setX] = useState()

  useEffect(() => {
    async function getCreditsAccs() {
      await getCreditAccountData();
    }
    getCreditsAccs()
  }, [])

  console.log(x)

  return <div className="App">
    <div className="credit-account-table">
      <div className='balance-title'>Your Balance</div>
      <div className='balances-data'>
        <div className='balance-info'>
          <div className='balance-label'>Balance: </div>{creditAccountData? String(Number(creditAccountData.totalValue)/1000000) + ' '+ ADDRESS_TOKEN_MAPPING.find((item:any)=> item.address === creditAccountData.underlyingToken )?.token : '...loading'}
          </div>
        <div className='balance-info'>
         <div className='balance-label'> Credit Manager Address: </div> {creditAccountData? creditAccountData.creditManager : '...loading'}
          </div>
        <div className='balance-info'>
          <div className='balance-label'>Borrowed Amount + Interest: </div>{creditAccountData? creditAccountData.borrowedAmountPlusInterest : '...loading'}
          </div>
      </div>
    </div>

  </div>
}
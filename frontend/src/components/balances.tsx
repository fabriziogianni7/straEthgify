import { useContext, useEffect, useState } from "react"
import { GeneralContext } from '../context/index';
export default function Balances() {

  const { getCreditAccountData } = useContext(GeneralContext)

  const [x, setX] = useState()

  useEffect(() => {
    (async function () {
      const data = await getCreditAccountData()
      setX(data)
    })()


    //  const data =  await getCreditAccountData()
    //  return data
    //   // setX(data.borrowRate)
    //   // console.log('data in useEffect', await data.borrowRate)
    // }
  }, [])

  console.log(x)
  return <div className="App">
    CAZZO
  </div>
}
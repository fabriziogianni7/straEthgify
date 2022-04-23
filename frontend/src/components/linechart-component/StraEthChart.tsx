import React, { useEffect, useState, useContext } from 'react';
import './css/StraEthChart.css';
import ZoomableLineChart from './zoomableLineChart';
import { Fetcher } from '../../api/Fetcher';
import { GeneralContext } from '../../context';


function StraEthChart() {

  const context = useContext(GeneralContext)


  const [benchmark, setBenchmark] = useState()
  const [firstStrategy, setFirstStrategy] = useState()
  const [secondStrategy, setSecondStrategy] = useState()

  useEffect(() => {
    Fetcher({
      "asset": "bitcoin",
      "startingBalance": 10000,
      "period": 100,
      "startingDate": "01/01/2019"
    }).then((response) => {
      setBenchmark(response.benchmark)
      setFirstStrategy(response.strategy)
      setSecondStrategy(response.strategyWithYearn)
    })
    console.log(context.assetBacktest)
  }, [
    context.assetAmount,
    context.dateBacktest,
    context.timeFrameBacktest,
    context.leverageFactor,
    context.windowSize,
    context.assetBacktest
  ]);


  return <div className="chart-group">
    <ZoomableLineChart
      benchmark={benchmark}
      firstStrategy={firstStrategy}
      secondStrategy={secondStrategy}
      thirdStrategy={benchmark}
    />
  </div>
}

export default StraEthChart;

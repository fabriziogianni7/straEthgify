import React, { useEffect, useState, useContext } from 'react';
import './css/StraEthChart.css';
import ZoomableLineChart from './zoomableLineChart';
import { Fetcher } from '../../api/Fetcher';
import { GeneralContext } from '../../context';
import moment from 'moment/moment'

function StraEthChart() {
  const context = useContext(GeneralContext)

  const [benchmark, setBenchmark] = useState()
  const [firstStrategy, setFirstStrategy] = useState()
  const [secondStrategy, setSecondStrategy] = useState()

  useEffect(() => {
    console.log({
      "asset": context.assetBacktest,
      "startingBalance": context.assetAmount,
      "period": context.windowSize,
      "startingDate": moment(context.dateBacktest).format('DD/MM/YYYY')
    })
    Fetcher({
      "asset": context.assetBacktest,
      "startingBalance": context.assetAmount,
      "period": context.windowSize,
      "startingDate": moment(context.dateBacktest).format('DD/MM/YYYY')
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

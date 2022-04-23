import React, { useEffect, useState } from 'react';
import './css/StraEthChart.css';
import ZoomableLineChart from './zoomableLineChart';
import {  } from './mock-data'
import { Fetcher } from '../../api/Fetcher';

function StraEthChart() {

  const [benchmark, setBenchmark] = useState()
  const [firstStrategy, setFirstStrategy] = useState()
  const [secondStrategy, setSecondStrategy] = useState()

  useEffect(() => {
    Fetcher({
      "asset": "bitcoin",
      "startingBalance": 10000,
      "period": 100,
      "startingDate": "01/01/2019"
    }).then((response) =>{
      setBenchmark(response.benchmark)
      setFirstStrategy(response.strategy)
      setSecondStrategy(response.strategyWithYearn)
    })
  }, []);


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

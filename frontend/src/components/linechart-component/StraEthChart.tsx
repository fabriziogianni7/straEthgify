import React, { useEffect, useState } from 'react';
import './css/StraEthChart.css';
import ZoomableLineChart from './zoomableLineChart';
import {  } from './mock-data'
import { Fetcher } from '../../api/Fetcher';

function StraEthChart() {

  const [benchmark, setBenchmark] = useState()
  const [firstStrategy, setFirstStrategy] = useState()
  const [thirdData, setthirdData] = useState()



  useEffect(() => {
    Fetcher({
      "asset": "bitcoin",
      "startingBalance": 10000,
      "period": 100,
      "startingDate": "01/01/2015"
    }).then((response) =>{
      console.log(response)
      setBenchmark(response.benchmark)
      setFirstStrategy(response.benchmark)
      setthirdData(response.benchmark)
    })
  }, []);



  return <div className="chart-group">
    <ZoomableLineChart
      benchmark={benchmark}
      firstStrategy={firstStrategy}
      secondStrategy={thirdData}
      thirdStrategy={thirdData}
    />
  </div>
}

export default StraEthChart;

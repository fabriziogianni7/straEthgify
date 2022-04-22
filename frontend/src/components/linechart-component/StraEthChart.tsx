import React from 'react';
import './css/StraEthChart.css';
import ZoomableLineChart from './zoomableLineChart';
import {firstStrategy, benchmark,thirdData} from './mock-data'

function StraEthChart() {
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

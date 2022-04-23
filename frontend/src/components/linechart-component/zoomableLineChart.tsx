import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  select,
  scaleLinear,
  line,
  axisBottom,
  axisLeft,
  zoom,
  timeFormat
} from "d3";
import useResizeObserver from "./useResizeObserver";
import './css/StraEthChart.css'
import moment from 'moment';
import { lineChartProps } from './constants'
import { Chip, Typography } from "@material-ui/core";
import PanoramaFishEyeRounded from '@mui/icons-material/PanoramaFishEyeRounded';


/**
 * Component that renders a ZoomableLineChart
 */


function ZoomableLineChart({
  benchmark,
  firstStrategy,
  secondStrategy,
  thirdStrategy,
  id = "myZoomableLineChart"
}: lineChartProps) {

  const svgRef: any = useRef();
  const wrapperRef: any = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState<any>();
  const [hideBenchmark, setHideBenchmark] = useState(false);
  const [hideFirstStrategy, setHideFirstStrategy] = useState(false);
  const [hideSecondStrategy, setHideSecondStrategy] = useState(false);
  const [hideThirdStrategy, setHideThirdStrategy] = useState(false);

  const labelsStrokesClasses = [
    { label: 'Benchmark', stroke: 'red', lineClass: 'benchmarkLine', cb: setHideBenchmark, attr: hideBenchmark },
    { label: 'First Strategy', stroke: 'blue', lineClass: 'firstStrategyLine', cb: setHideFirstStrategy, attr: hideFirstStrategy },
    { label: 'Second Strategy', stroke: 'green', lineClass: 'secondStrategyLine', cb: setHideSecondStrategy, attr: hideSecondStrategy },
    { label: 'Third Strategy', stroke: 'pink', lineClass: 'thirdStrategyLine', cb: setHideThirdStrategy, attr: hideThirdStrategy },
  ]

  // will be called initially and on every benchmark change
  useEffect(() => {
    if (!benchmark) return

    const formatTime = timeFormat("%B %d, %Y");
    formatTime(new Date); // "June 30, 2015"

    const svg = select(svgRef.current || '');
    const benchmarkValues = benchmark.map((val: any) => val.value)
    const dates = benchmark.map((val: any) => formatTime(new Date(val.date)))
    console.log(dates)
    const firstStrategyValues = firstStrategy?.map((val: any) => val.value)
    const secondStrategyValues = secondStrategy?.map((val: any) => val.value * 0.5)
    const thirdStrategyValues = thirdStrategy?.map((val: any) => val.value * -1.5)
    const svgContent = svg.select(".content");
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const xScale = scaleLinear()
      .domain([0, benchmarkValues.length - 1])
      .range([0, width]);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain(newXScale.domain());
    }

    // TODO dynamically set min and max
    let minValue = -80
    let maxValue = 80

    // if (secondValues) {
    //   minValue = Math.min(...values, ...secondValues)
    //   maxValue = Math.max(...values, ...secondValues)
    // } else {
    //   minValue = Math.min(...values)
    //   maxValue = Math.max(...values)
    // }

    const yScale = scaleLinear()
      .domain([minValue - 0.1 * Math.abs(minValue), maxValue + 0.1 * Math.abs(maxValue)])
      .rangeRound([height, 0])

    const lineGenerator = line()
      .x((d: any, index: any) => xScale(index))
      .y((d: any) => yScale(d))

    // setLineGenerator(lineGenerator)

    // render the line
    if (!hideBenchmark) {
      svgContent
        .selectAll('.' + labelsStrokesClasses[0].lineClass)
        .data([benchmarkValues])
        .join("path")
        .attr("class", labelsStrokesClasses[0].lineClass)
        .attr("stroke", labelsStrokesClasses[0].stroke)
        .attr("stroke-width", 5)
        .attr("fill", "none")
        .attr("d", lineGenerator);
    }

    firstStrategy = null
    secondStrategy = null
    thirdStrategy = null


    if (firstStrategy && !hideFirstStrategy) {
      svgContent
        .selectAll('.' + labelsStrokesClasses[1].lineClass)
        .data([firstStrategyValues])
        .join("path")
        .attr("class", labelsStrokesClasses[1].lineClass)
        .attr("stroke", labelsStrokesClasses[1].stroke)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", lineGenerator);
    }
    if (secondStrategy && !hideSecondStrategy) {
      svgContent
        .selectAll('.' + labelsStrokesClasses[2].lineClass)
        .data([secondStrategyValues])
        .join("path")
        .attr("class", labelsStrokesClasses[2].lineClass)
        .attr("stroke", labelsStrokesClasses[2].stroke)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", lineGenerator);
    }
    if (thirdStrategy && !hideThirdStrategy) {
      svgContent
        .selectAll('.' + labelsStrokesClasses[3].lineClass)
        .data([thirdStrategyValues])
        .join("path")
        .attr("class", labelsStrokesClasses[3].lineClass)
        .attr("stroke", labelsStrokesClasses[3].stroke)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", lineGenerator);
    }

    // axes
    const xAxis: any = axisBottom(xScale)
      .tickSize(-height)
      .tickPadding(10)
      .tickFormat((v: any) => moment(dates[v]).format(' DD MMM YYYY'))
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(10,0)rotate(-25)");

    const yAxis: any = axisLeft(yScale)
      .tickPadding(10)
      .tickSize(-width)
    svg.select(".y-axis").call(yAxis);

    // zoom
    const zoomBehavior: any = zoom()
      .scaleExtent([1, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event: any) => {
        const zoomState = event.transform;
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehavior);
  }, [currentZoomState, benchmark, firstStrategy, dimensions]);

  const hideShowLine = (lineClass: any, stroke: any, attr: any, cb: any) => {
    const svg: any = select(svgRef.current);
    const svgContent = svg.select(".content");

    if (!attr) {
      svgContent
        .selectAll('.' + lineClass)
        .attr("class", lineClass)
        .attr("stroke", 'transparent')
      cb(true)
    } else { //lineGenerator
      console.log('inside else')
      svg
        .selectAll('.' + lineClass)
        .attr("class", lineClass)
        .attr("stroke", stroke)
      cb(false)
    }


  }

  return (
    <div style={{ position: 'relative', padding: "4vh" }}>
      <Typography variant="h5" style={{ textAlign: "left" }} color='primary'>Show/hide strategy</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: "4vh" }}>
        {
          labelsStrokesClasses.map(item =>
            <div className='chip-container' >
              <Chip
                label={item.label}
                style={{ background: item.stroke, opacity: item.attr ? 0.5 : 1 }}
                onClick={() => hideShowLine(item.lineClass, item.stroke, item.attr, item.cb)}
                deleteIcon={
                  <PanoramaFishEyeRounded />}
              />
              {/* <div style={{ background: item.stroke, height: '20px', width: '50px' }} onClick={() => hideShowLine(item.lineClass, item.stroke, item.attr, item.cb)}></div>
              {item.label} */}

            </div>)
        }
      </div>
      <div ref={wrapperRef} style={{ margin: "2rem" }}>
        <svg ref={svgRef} id='zoomable-svg'>
          <g className="x-axis" />
          <g className="y-axis" />
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
        </svg>
      </div>


    </div>
  );
}

export default ZoomableLineChart;

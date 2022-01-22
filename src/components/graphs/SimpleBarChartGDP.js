import "./SimpleBarChartGDP.css";
import * as d3 from "d3";
import React, { useEffect } from "react";

const SimpleBarChartGDP = (props) => {
  let dataset = [];

  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      dataset = data;
    });

  const dataPoints = dataset.data;

  useEffect(() => {
    let barHeight = 1;
    d3.select("svg")
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("width", "1px")
      .attr("height", barHeight + "px")
      .attr("background-color", "black");
    {
      barHeight++;
    }
    //   .attr("x", 0 + i)
    //   .attr("y", 0)

    //   .attr("background-color", "white")
    //   .append("h2")
    //   .attr("font-size", "25px")
    //   .text("test")
    //   .attr("width", "25px")
    //   .attr("height", "25px")
    //   .attr("x", 100)
    //   .attr("y", 100)
    //   .attr("color", "white")
    //   .attr("background-color", "white")
    //   .attr("font-size", "25px");
  });

  const buildGraph = () => {
    console.log(dataset.data[0][1]);
  };
  return (
    <div className="simple-bar-chart">
      bar chart here
      <svg
        style={{
          height: 250,
          width: 250,
          marginLeft: "0px",
          marginRight: "0px",
          backgroundColor: "blue",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={buildGraph}>Testing button</button>
    </div>
  );
};

export default SimpleBarChartGDP;

import "./SimpleBarChartGDP.css";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";

const SimpleBarChartGDP = (props) => {
  const [datasetUS, setDatasetUS] = useState("");

  if (datasetUS === "") {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setDatasetUS(data);
      });
  }

  const generateGraph = (dataset) => {
    d3.select("svg")
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("width", "2px")
      .attr("height", (d) => d[1] / 10 + "px")
      .attr("background-color", "black")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d) => 500 - d[1] / 10);
  };

  useEffect(() => {
    if (datasetUS !== "") {
      generateGraph(datasetUS);
    }
  }, [datasetUS]);

  return (
    <div className="simple-bar-chart">
      bar chart here
      <svg className="svg-element">
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default SimpleBarChartGDP;

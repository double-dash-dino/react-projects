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
    const height = d3.max(dataset.data, (d) => d[1]) / 30 + 50;
    const width = dataset.data.length * 3;
    // const xScale = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(dataset.data), (d) => d[0] * 2])
    //   .range([0, 1000]);

    // const yScale = d3
    //   .scaleLinear()
    //   .domain(0, [d3.max(dataset.data, (d) => d[1])])
    //   .range([500, 0]);

    d3.select("svg")
      .attr("height", height)
      .attr("width", width)

      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("class", "chart-bar")
      .attr("height", (d) => d[1] / 20 + "px")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d) => height - d[1] / 30);

    d3.select("svg")
      .selectAll("text")
      .data(dataset.data)
      .enter()
      .append("text")
      .attr("class", "tooltip")
      .attr("x", (d, i) => i * 3)
      .attr("y", height)
      .text("LABEL");
  };

  useEffect(() => {
    if (datasetUS !== "") {
      generateGraph(datasetUS);
    }
  }, [datasetUS]);

  return (
    <div className="simple-bar-chart">
      <svg className="svg-element">
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default SimpleBarChartGDP;

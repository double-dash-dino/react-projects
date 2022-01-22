import "./SimpleBarChartGDP.css";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";

const SimpleBarChartGDP = (props) => {
  console.log("rendering the dom");
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

  useEffect(() => {
    let datasetTest = [
      ["one", 1],
      ["two", 2],
      ["three", 3],
    ];

    if (datasetUS !== "") {
      console.log("type:", typeof datasetUS, datasetUS.data);
      d3.select("svg")
        .selectAll("rect")
        //   .data(datasetTest)
        .data(datasetUS.data)
        .enter()
        .append("rect")
        .attr("width", "2px")
        .attr("height", (d) => d[1] / 10 + "px")
        .attr("background-color", "black")
        .attr("x", (d, i) => i * 3)
        .attr("y", (d) => 500 - d[1] / 10);
    }
  }, [datasetUS]);

  const buildGraph = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setDatasetUS(data);
      });
    // console.log(typeof datasetUS.data[0][1], datasetUS.data, datasetUS);
  };
  return (
    <div className="simple-bar-chart">
      bar chart here
      <svg
        style={{
          height: 500,
          width: "100%",
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

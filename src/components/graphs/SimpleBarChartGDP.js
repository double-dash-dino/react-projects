import "./SimpleBarChartGDP.css";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";

const SimpleBarChartGDP = (props) => {
  const [datasetUS, setDatasetUS] = useState("");
  const [chartIsBuilt, setChartIsBuilt] = useState(false);

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

    d3.select("svg").attr("height", height).attr("width", width);

    d3.select("svg").append("g").attr("id", "bar-node");
    d3.select("svg").append("g").attr("id", "tooltip-node");

    d3.select("#bar-node")
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("id", (d, i) => "bar-" + i)
      .attr("class", "chart-bar")
      .attr("height", (d) => d[1] / 20 + "px")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d) => height - d[1] / 30);

    d3.select("#tooltip-node")
      .selectAll("g")
      .data(dataset.data)
      .enter()
      .append("g")
      .attr("id", (d, i) => "data-point-" + i)
      .attr("class", "data-point-node");

    // for (let i = 0; i < dataset.data.length; i++) {
    d3.selectAll(".data-point-node")
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("id", (d, i) => "bar-label-" + i)
      .attr("class", "tooltip-box")
      .attr("x", (d, i) => i * 3)
      .attr("y", height / 2);
    // }

    for (let i = 0; i < dataset.data.length; i++) {
      let quarterNumber = "";
      switch (dataset.data[i][0].slice(5, 7)) {
        case "01":
          quarterNumber = "1";
          break;
        case "04":
          quarterNumber = "2";
          break;
        case "07":
          quarterNumber = "3";
          break;
        case "10":
          quarterNumber = "4";
          break;
        default:
          break;
      }
      let year = "";
      year = dataset.data[i][0].slice(0, 4);

      let tooltipDate = year + " Q" + quarterNumber;
      let tooltipAmount = " $" + dataset.data[i][1] + " Billion";
      d3.selectAll(".tooltip-box")
        .append("text")
        .attr("class", "tooltip-text")
        .append("tspan")
        .attr("x", i * 3)
        .attr("y", height / 2 + 40)
        .text(tooltipDate)
        .append("tspan")
        .attr("x", i * 3)
        .attr("y", height / 2 + 80)
        .text(tooltipAmount);
    }

    d3.select("#tooltip-node").selectAll("text").attr("fill", "black");

    d3.select("svg")
      .selectAll("rect")
      .on("mouseover", (event) => {
        console.log(dataset.data[2][0]);
        let barID = event.target.id.match(/\d+/)[0];
        d3.select("#bar-label-" + barID).style("opacity", "100%");
        d3.select("svg")
          .select("#data-point-text-" + barID)
          .style("opacity", "100%");
      });

    d3.select("svg")
      .selectAll("rect")
      .on("mouseout", (event) => {
        let barID = event.target.id.match(/\d+/)[0];
        d3.select("#bar-label-" + barID).style("opacity", "0%");
        d3.select("svg")
          .select("#data-point-text-" + barID)
          .style("opacity", "0%");
      });

    setChartIsBuilt(true);
  };

  useEffect(() => {
    if (datasetUS !== "" && !chartIsBuilt) {
      generateGraph(datasetUS);
    }
  }, [datasetUS, chartIsBuilt]);

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

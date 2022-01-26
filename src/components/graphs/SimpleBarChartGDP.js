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
    console.log("building graph");
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
      .attr("id", (d, i) => "data-point" + i)
      .attr("class", "data-point-node");

    for (let i = 0; i < dataset.data.length; i++) {
      d3.select("#data-point" + i)
        .append("rect")
        .attr("id", "bar-label-" + i)
        .attr("class", "tooltip")
        .attr("x", i * 3)
        .attr("y", height / 2)
    }

    for (let i = 0; i < dataset.data.length; i++) {
      let tooltipText = dataset.data[i][0]+' quarter'+'$'+dataset.data[i][1]+' Billion'
      d3.select("#data-point" + i)
        .append("text")
        .attr('id', 'data-point-text-'+i)
        .attr("class", "tooltip-text")
        .attr("x", i * 3)
        .attr("y", height / 2 + 25)
        .text(tooltipText);
    }

    d3.select("#tooltip-node").selectAll("text").attr("fill", "black");

    d3.select("svg")
      .selectAll("rect")
      .on("mouseover", (event) => {
        let barID = event.target.id.match(/\d+/)[0];
        console.log(barID);
        d3.select("#bar-label-" + barID).style("opacity", "100%");
        d3.select('svg').select("#data-point-text-" + barID)
          .style('opacity','100%');
        console.log(document.getElementById("bar-label-" + barID));
      });

    d3.select("svg")
      .selectAll("rect")
      .on("mouseout", (event) => {
        let barID = event.target.id.match(/\d+/)[0];
        d3.select("#bar-label-" + barID).style("opacity", "0%");
        d3.select('svg').select("#data-point-text-" + barID)
          .style('opacity','0%');
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

import React, { useState, useEffect } from "react";
import "./ScatterplotGraphDoping.css";
import * as d3 from "d3";

const ScatterplotGraphDoping = (props) => {
  const [dataset, setDataset] = useState("");

  // Get the data
  if (dataset === "") {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setDataset(data);
      });
  }

  useEffect(() => {
    const buildChart = (dataset) => {
      const height = 500;
      const width = 800;
      const padding = 50;

      // Build canvas

      d3.select(".scatterplot-graph")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "canvas");

      // Add scales

      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(dataset, (d) => d["Year"]) - 2,
          d3.max(dataset, (d) => d["Year"]),
        ])
        .range([padding, width - padding]);
      const yScale = d3
        .scaleLinear()
        .domain([2400, 2200])
        // .domain([
        //   (d3.max(dataset, (d) => d["Seconds"]),
        //   d3.min(dataset, (d) => d["Seconds"])),
        // ])
        .range([padding, height - padding]);

      // Add axes

      const xAxis = d3.axisBottom().scale(xScale);
      const yAxis = d3.axisLeft().scale(yScale);
      d3.select("svg")
        .append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);
      d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

      console.log(dataset);
    };

    if (
      !document.getElementById("scatterplot-graph").hasChildNodes() &&
      dataset !== ""
    ) {
      buildChart(dataset);
    }
  }, [dataset]);

  return <div className="scatterplot-graph" id="scatterplot-graph"></div>;
};

export default ScatterplotGraphDoping;

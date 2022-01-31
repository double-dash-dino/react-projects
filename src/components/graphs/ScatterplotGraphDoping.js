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
        .domain([2200, 2400])
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

      // Add data points

      d3.select("svg")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d["Year"]))
        .attr("cy", (d) => yScale(d["Seconds"]))
        .attr("r", 7)
        .attr("class", (d) => {
          if (d["Doping"] === "") {
            return "clean-data-point";
          } else {
            return "dirty-data-point";
          }
        })
        .attr("Year", (d) => d["Year"])
        .attr("fill", "black");

      // Add tooltip

      const tooltip = d3
        .select(".scatterplot-graph")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip");

      // Format text data for tooltip

      const getTooltipText = (data) => {
        let line1 = data["Name"] + "   " + data["Nationality"];
        let line2 = "Year: " + data["Year"] + "  Time: " + data["Time"];
        let line3 = data["Doping"];

        return (
          "<p className='tooltip-text'> " +
          line1 +
          " <br> <br> " +
          line2 +
          " <br> <br> " +
          line3 +
          " </p>"
        );
      };

      // Add pointer events

      d3.select("svg")
        .selectAll("circle")
        .on("mouseover", (event) => {
          let circleData = event.target.__data__;
          console.log(circleData["Name"] + "   " + circleData["Nationality"]);
          tooltip
            .transition()
            .duration(0)
            .style("opacity", 1)
            .style("left", xScale(circleData["Year"]) + "px")
            .style("top", yScale(circleData["Seconds"]) + "px");

          tooltip.html(getTooltipText(circleData));
        })

        .on("mouseout", (event) => {
          tooltip.transition().duration(0).style("opacity", 0);
        });

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

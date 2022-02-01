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
      // Convert time data to usable format

      const climbTimes = [];
      for (let i = 0; i < dataset.length; i++) {
        let newDate = new Date(
          1970,
          0,
          1,
          0,
          dataset[i]["Time"].split(":")[0],
          dataset[i]["Time"].split(":")[1]
        );
        climbTimes.push(newDate);
      }

      const height = 700;
      const width = 800;
      const padding = 70;

      // Build canvas

      d3.select(".scatterplot-graph")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "canvas");

      // Add text elements

      d3.select("svg")
        .append("text")
        .attr("x", width / 3)
        .attr("y", padding)
        .attr("class", "chart-title")
        .attr("id", "title")
        .text("Doping in Professional Bicycle Racing");

      d3.select("svg")
        .append("text")
        .attr("x", width / 3 + 50)
        .attr("y", padding * 1.5)
        .attr("class", "chart-subtitle")
        .text("35 Fastest times up Alpe d'Huez");

      d3.select("svg")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", padding + 30)
        .text("Time in minutes")
        .attr("class", "side-text");

      // Add scales

      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(dataset, (d) => d["Year"]) - 2,
          d3.max(dataset, (d) => d["Year"]),
        ])
        .range([padding, width - padding]);
      const yScale = d3
        .scaleTime()
        .domain([d3.min(climbTimes), d3.max(climbTimes)])
        .range([padding, height - padding]);

      // Add key

      d3.select("svg")
        .append("rect")
        .attr("x", width - padding - 150)
        .attr("y", height / 2 - 50)
        .attr("class", "key-colour no-doping");

      d3.select("svg")
        .append("rect")
        .attr("x", width - padding - 150)
        .attr("y", height / 2 - 100)
        .attr("class", "key-colour doping");

      d3.select("svg")
        .append("text")
        .attr("x", width - padding - 125)
        .attr("y", height / 2 - 40)
        .attr("font-size", "0.4em")
        .text("No doping allegations");

      d3.select("svg")
        .append("text")
        .attr("x", width - padding - 125)
        .attr("y", height / 2 - 90)
        .attr("font-size", "0.4em")
        .text("Riders with doping allegations");

      // Add axes

      const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickFormat(d3.timeFormat("%M:%S"));
      d3.select("svg")
        .append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis)
        .attr("stroke", "black")
        .attr("id", "x-axis");
      d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis)
        .attr("stroke", "black")
        .attr("id", "y-axis");

      // Add data points

      d3.select("svg")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d["Year"]))
        .attr("cy", (d, i) => yScale(climbTimes[i]))
        .attr("r", 7)
        .attr("class", (d) => {
          if (d["Doping"] === "") {
            return "dot clean-data-point";
          } else {
            return "dot dirty-data-point";
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
          "<p class='tooltip-text'> " +
          line1 +
          " <br> " +
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
          tooltip
            .transition()
            .duration(0)
            .style("opacity", 1)
            .style("left", xScale(circleData["Year"]) + 120 + "px")
            .style(
              "top",
              yScale(climbTimes[circleData["Place"] - 1]) + 20 + "px"
            );

          tooltip.html(getTooltipText(circleData));
        })

        .on("mouseout", (event) => {
          tooltip.transition().duration(0).style("opacity", 0);
        });
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

import React, { useState, useEffect } from "react";
import "./HeatmapTemperatures.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const HeatmapTemperatures = (props) => {
  const [dataset, setDataset] = useState("");

  //   Fetch the data
  if (dataset === "") {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setDataset(data);
      });
  }

  useEffect(() => {
    const buildChart = (dataset) => {
      //   Get colour scale

      const baseTemperature = dataset["baseTemperature"];

      const getColour = (num) => {
        let shade = "";
        let temperature = Math.round((baseTemperature + num) * 10) / 10;
        if (temperature < 5) {
          shade = "#2C63DB";
        } else if (temperature < 7) {
          shade = "#ACB5F5";
        } else if (temperature < 9) {
          shade = "#FFCC01";
        } else if (temperature < 11) {
          shade = "#F06E00";
        } else {
          shade = "#E62A00";
        }
        return shade;
      };

      // Get tooltip html

      const getToolTipHtml = (data) => {
        let date = data["year"] + " - " + monthConverter(data["month"]);
        let temperature =
          Math.round((baseTemperature + data["variance"]) * 10) / 10 + "°C";
        let variance = Math.round(data["variance"] * 10) / 10 + "°C";
        return (
          "<p class='tooltip-text'>" +
          date +
          " <br> " +
          temperature +
          " <br> " +
          variance
        );
      };

      // Convert number to month of the year
      const monthConverter = (num) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return months[num - 1];
      };

      const height = 800;
      const width = 1200;
      const padding = 150;

      // Build canvas

      const canvas = d3
        .select(".heatmap-temperatures")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "heatmap-canvas");

      // Add scales

      const xScale = d3
        .scaleBand()
        .domain(dataset["monthlyVariance"].map((d) => d["year"]))
        .range([padding, width - padding])
        .padding(0);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(dataset["monthlyVariance"], (d) => d["month"] - 0.5),
          d3.max(dataset["monthlyVariance"], (d) => d["month"] + 0.5),
        ])
        .range([padding, height - padding]);

      // Add axes

      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickValues(xScale.domain().filter((year) => year % 10 === 0));
      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickFormat((d) => monthConverter(d));

      canvas
        .append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis)
        .attr("id", "x-axis");

      canvas
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis)
        .attr("id", "y-axis");

      // Add tooltip

      const tooltip = d3
        .select(".heatmap-temperatures")
        .append("div")
        .attr("class", "heatmap-tooltip");

      // Add text elements

      canvas
        .append("text")
        .attr("x", (width - padding) / 2 - 200)
        .attr("y", padding - 50)
        .text("Monthly Global Land-Surface Temperature")
        .attr("id", "heatmap-title");

      canvas
        .append("text")
        .attr("x", (width - padding) / 2 - 100)
        .attr("y", padding - 10)
        .text("1753 - 2015: base temperature 8.66°C")
        .attr("id", "heatmap-description");

      canvas
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - padding + 40)
        .text("Years")
        .attr("id", "bottom-text")
        .attr("font-size", "0.4em");
      canvas
        .append("text")
        .attr("x", -height / 2)
        .attr("y", padding - 40)
        .attr("transform", "rotate(-90)")
        .text("Months")
        .attr("font-size", "0.4em")
        .attr("id", "side-text");

      // Add rect elements
      canvas
        .selectAll("rect")
        .data(dataset["monthlyVariance"])
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(d["year"]))
        .attr("y", (d, i) => yScale(d["month"] - 0.5))
        .attr("class", "cell")
        .style("fill", (d, i) => getColour(d["variance"]));

      // Add key

      const keyScale = d3
        .scaleLinear()
        .domain([3, 13])
        .range([padding, width / 3]);

      const keyAxis = d3.axisBottom().scale(keyScale);

      canvas
        .append("g")
        .attr("id", "key-group")
        .attr("transform", "translate(0, " + (height - padding / 3) + ")")
        .call(keyAxis.tickValues(["5", "7", "9", "11"]));

      const shades = ["#2C63DB", "#ACB5F5", "#FFCC01", "#F06E00", "#E62A00"];

      canvas
        .select("#key-group")
        .selectAll("rect")
        .data(shades)
        .enter()
        .append("rect")
        .attr("x", (d, i) => keyScale(i) * 2)
        .attr("y", -keyScale(1) / 2)
        .attr("height", keyScale(1) / 2)
        .attr("width", keyScale(1) / 2)
        .style("stroke", "black")
        .style("fill", (d) => d);

      // Add pointer event

      canvas
        .selectAll(".cell")
        .on("mouseenter", (event) => {
          let rectData = event.target.__data__;
          tooltip
            .transition()
            .transition(0)
            .style("opacity", 0.8)
            .style("left", xScale(rectData["year"] + 5) + "px")
            .style("top", yScale(rectData["month"]) + "px");

          tooltip.html(getToolTipHtml(rectData));
        })
        .on("mouseleave", () => {
          tooltip.transition().duration(0).style("opacity", 0);
        });
    };

    if (
      !document.getElementById("heatmap-temperatures").hasChildNodes() &&
      dataset !== ""
    ) {
      buildChart(dataset);
    }
  }, [dataset]);

  return <div className="heatmap-temperatures" id="heatmap-temperatures"></div>;
};

export default HeatmapTemperatures;

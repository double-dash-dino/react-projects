import React, { useState, useEffect } from "react";
import "./HeatmapTemperatures.css";
import * as d3 from "d3";

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
      // Convert dates to usable format
      const datesList = [];
      for (let i = 0; i < dataset["monthlyVariance"].length; i++) {
        let newDate = new Date(
          dataset["monthlyVariance"][i]["year"],
          dataset["monthlyVariance"][i]["month"] - 1,
          1,
          0,
          0,
          0
        );
        datesList.push(newDate);
      }
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

      const height = 700;
      const width = 1000;
      const padding = 70;

      // Build canvas

      const canvas = d3
        .select(".heatmap-temperatures")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "canvas");

      // Add scales

      const xScale = d3
        .scaleTime()
        .domain([d3.min(datesList), d3.max(datesList)])
        .range([padding, width - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(dataset["monthlyVariance"], (d) => d["month"]),
          d3.max(dataset["monthlyVariance"], (d) => d["month"]),
        ])
        .range([padding, height - padding]);

      // Add axes

      const xAxis = d3.axisBottom().scale(xScale);
      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickFormat((d) => monthConverter(d));

      canvas
        .append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

      canvas
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

      console.log(datesList[0].getFullYear());
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

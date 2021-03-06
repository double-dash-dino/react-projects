import "./SimpleBarChartGDP.css";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";

const SimpleBarChartGDP = (props) => {
  const [datasetUS, setDatasetUS] = useState("");
  const [chartIsBuilt, setChartIsBuilt] = useState(false);

  // Get the data
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
    const getToolTipHtml = (num) => {
      let quarterNumber = "";
      let year = "";
      switch (datasetUS.data[num][0].slice(5, 7)) {
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

      year = datasetUS.data[num][0].slice(0, 4);

      let tooltipDate = year + " Q" + quarterNumber;
      let tooltipAmount =
        "$ " + datasetUS.data[num][1].toLocaleString(undefined) + " Billion";

      return (
        "<p class='bar-chart-tooltip-text'>" +
        tooltipDate +
        " <br> " +
        tooltipAmount +
        "</p>"
      );
    };
    // Make the graph

    const generateGraph = (dataset) => {
      // Put the dates data in a usable format

      const datesList = [];
      for (let i = 0; i < dataset.data.length; i++) {
        datesList.push(new Date(dataset.data[i][0]));
      }

      const height = 500;
      const width = 800;
      const padding = 70;

      // Add scales
      const xScale = d3
        .scaleTime()
        .domain([d3.min(datesList), d3.max(datesList)])
        .range([padding, width - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([18000, 0])
        .range([padding, height - padding]);

      //   Create canvas
      d3.select(".simple-bar-chart")
        .append("svg")
        .attr("class", "svg-element")
        .attr("height", height)
        .attr("width", width)
        .append("title", "Growth of US GDP")
        .attr("id", "title");

      // Add bars
      d3.select("svg")
        .selectAll("rect")
        .data(dataset.data)
        .enter()
        .append("rect")
        .attr("id", (d, i) => "bar-" + i)
        .attr("class", "bar")
        .attr("height", (d) => d[1] / 50)
        .attr("x", (d, i) => xScale(datesList[i]))
        .attr("y", (d) => height - padding - d[1] / 50)
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1]);

      // Add axes
      const xAxis = d3.axisBottom().scale(xScale);
      const yAxis = d3.axisLeft().scale(yScale);
      d3.select("svg")
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);
      d3.select("svg")
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

      // Create tooltip
      const tooltip = d3
        .select(".simple-bar-chart")
        .append("div")
        .attr("id", "bar-chart-tooltip")
        .attr("class", "bar-chart-tooltip");

      //   Add pointer events

      d3.select(".simple-bar-chart")
        .selectAll(".bar")
        .on("mouseover", (event) => {
          let barID = event.target.id.match(/\d+/);
          tooltip
            .transition()
            .duration(0)
            .style("opacity", "1")
            .style("left", barID * 3 + "px")
            .style("top", "250px");

          tooltip.html(getToolTipHtml(barID));
        });

      d3.select(".simple-bar-chart")
        .selectAll(".bar")
        .on("mouseout", (event) => {
          tooltip.style("opacity", "0");
        });

      //   Add bottom text

      d3.select("svg")
        .append("text")
        .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
        .attr("x", width / 3)
        .attr("y", height - padding / 3)
        .attr("class", "bottom-text");

      //   Add side text

      d3.select("svg")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", width / 8)
        .text("Gross Domestic Product")
        .attr("class", "bar-chart-side-text");

      setChartIsBuilt(true);
    };
    if (datasetUS !== "" && !chartIsBuilt) {
      generateGraph(datasetUS);
    }
  }, [datasetUS, chartIsBuilt]);

  return <div className="simple-bar-chart"></div>;
};

export default SimpleBarChartGDP;

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "./ChoroplethUSEducation.css";

const ChoroplethUSEducation = (props) => {
  const [datasetEducation, setDatasetEducation] = useState("");
  const [datasetUSCounties, setDatasetUSCounties] = useState("");

  // Get the data
  if (datasetEducation === "") {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    )
      .then((response) => response.json())
      .then((data) => setDatasetEducation(data));
  }
  if (datasetUSCounties === "") {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
    )
      .then((response) => response.json())
      .then((data) => setDatasetUSCounties(data));
  }

  useEffect(() => {
    const buildChart = (data1, data2) => {
      // Get data values
      const dataset = { education: data1, usCounties: data2 };
      const educationMin = d3.min(
        dataset.education,
        (d) => d["bachelorsOrHigher"]
      );
      const educationMax = d3.max(
        dataset.education,
        (d) => d["bachelorsOrHigher"]
      );

      const width = 1000;
      const height = 700;
      const padding = 200;

      // Add text elements div at the top

      d3.select(".choropleth-us-education")
        .append("div")
        .attr("class", "choropleth-text-div")
        .attr("x", width / 2)
        .attr("y", padding)
        .attr("width", width)
        .html(
          "<p class='choropleth-title'> United States Educational Attainment </p> <p class='choropleth-subtitle'>Percentage of adults age 25 and older with a bachelor's degree or higher</p>"
        );

      // Build canvas

      const canvas = d3
        .select(".choropleth-us-education")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "canvas");

      // Get colours scale
      const numberOfSteps = 8;
      const colourArray = d3.schemeBlues;
      const colourScale = d3
        .scaleThreshold()
        .domain(
          d3.range(
            educationMin,
            educationMax,
            (educationMax - educationMin) / numberOfSteps
          )
        )
        .range(colourArray[numberOfSteps + 1]);

      //  Draw map + fill in colours

      canvas
        .append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(
          topojson.feature(
            dataset["usCounties"],
            dataset["usCounties"].objects.counties
          ).features
        )
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("data-fips", (d) => d["id"])
        .attr("fill", (d, i) => {
          let countyCode = dataset.education.filter((obj) => {
            return obj.fips === d.id;
          })[0];
          return colourScale(countyCode["bachelorsOrHigher"]);
        })
        .attr("d", d3.geoPath());

      // Add legend

      const legendScale = d3
        .scaleLinear()
        .domain([educationMin, educationMax])
        .range([500, 900]);

      const legendAxis = d3
        .axisBottom()
        .scale(legendScale)
        .tickSize(15)
        .tickFormat((d, i) => {
          if (i === numberOfSteps - 1) {
            return Math.round(d) + "%+";
          } else {
            return Math.round(d) + "%";
          }
        })
        .tickValues(colourScale.domain())
        .tickSizeOuter(0);

      canvas
        .append("g")
        .attr("id", "choropleth-key")
        .attr("transform", "translate(0," + (height - 150) + ")")
        .call(legendAxis);

      canvas
        .select("#choropleth-key")
        .selectAll("rect")
        .data(
          colourScale.range().map((d) => {
            d = colourScale.invertExtent(d);
            if (d[0] === null) {
              d[0] = legendScale.domain()[0];
            }
            if (d[1] === null) {
              d[1] = legendScale.domain()[1];
            }
            return d;
          })
        )
        .enter()
        .append("rect")
        .attr("x", (d, i) => legendScale(d[0]))
        .attr("y", 0)
        .attr("height", "10px")
        .attr("width", (d, i) => {
          if (i === numberOfSteps - 1) {
            return "100px";
          } else {
            return "50px";
          }
        })

        .style("fill", (d, i) => colourArray[numberOfSteps][i]);

      console.log(legendScale.range());
      console.log(
        colourArray[numberOfSteps],
        educationMax,
        educationMin,
        numberOfSteps,
        legendScale(0 * ((educationMax - educationMin) / numberOfSteps))
      );

      // Add source

      d3.select(".choropleth-us-education")
        .append("div")
        .attr("class", "choropleth-source-div")
        .html(
          "<p class='choropleth-source-text'>Source: <a href='https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx' target='_blank'>USDA Economic Research Service</a> </p>"
        );

      // Add tooltip
      const tooltip = d3
        .select(".choropleth-us-education")
        .append("div")
        .attr("class", "choropleth-tooltip")
        .style("top", "200px")
        .style("left", "200px");

      // Get tooltip HTML

      const getTooltipHtml = (id) => {
        let countyCode = dataset.education.filter((obj) => {
          return obj.fips === id;
        })[0];
        return (
          "<p class='choropleth-tooltip-text'>" +
          countyCode["area_name"] +
          ", " +
          countyCode["state"] +
          " : " +
          countyCode["bachelorsOrHigher"] +
          "% </p>"
        );
      };

      // Add event listeners

      canvas
        .selectAll("path")
        .on("mouseover", (event) => {
          let data = event.target.__data__;
          tooltip
            .transition()
            .duration(0)
            .style("opacity", 1)
            .style("top", event.pageY + 10 + "px")
            .style("left", event.pageX + 10 + "px");
          tooltip.html(getTooltipHtml(data.id));
        })
        .on("mouseout", () => {
          tooltip.transition().duration(0).style("opacity", 0);
        });
    };

    if (
      datasetEducation !== "" &&
      datasetUSCounties !== "" &&
      !document.getElementById("choropleth-us-education").hasChildNodes()
    ) {
      buildChart(datasetEducation, datasetUSCounties);
    }
  }, [datasetEducation, datasetUSCounties]);
  return (
    <div className="choropleth-us-education" id="choropleth-us-education"></div>
  );
};

export default ChoroplethUSEducation;

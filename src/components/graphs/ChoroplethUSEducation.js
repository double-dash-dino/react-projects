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
      const dataset = { education: data1, usCounties: data2 };
      const educationMin = d3.min(
        dataset.education,
        (d) => d["bachelorsOrHigher"]
      );
      const educationMax = d3.max(
        dataset.education,
        (d) => d["bachelorsOrHigher"]
      );
      console.log(datasetEducation, datasetUSCounties, dataset);
      const width = 1000;
      const height = 1000;
      const padding = 50;

      const canvas = d3
        .select(".choropleth-us-education")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "canvas");

      const numberOfSteps = 8;
      const colourScale = d3
        .scaleThreshold()
        .domain(
          d3.range(
            educationMin,
            educationMax,
            (educationMax - educationMin) / numberOfSteps
          )
        )
        .range(d3.schemeGreens[numberOfSteps + 1]);

      console.log(
        colourScale(5),
        colourScale(50),
        d3.max(dataset.education, (d) => d["bachelorsOrHigher"])
      );

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
        .attr("fill", (d, i) =>
          colourScale(dataset.education[i]["bachelorsOrHigher"])
        )
        .attr("d", d3.geoPath());
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

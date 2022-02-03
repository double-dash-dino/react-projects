import React, { useState, useEffect } from "react";
import * as d3 from "d3";
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

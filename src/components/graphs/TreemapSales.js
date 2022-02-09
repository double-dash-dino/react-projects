import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./TreemapSales.css";

const TreemapSales = (props) => {
  const [datasetGames, setDatasetGames] = useState("");
  const [datasetFilms, setDatasetFilms] = useState("");
  const [datasetKickstarter, setDatasetKickstarter] = useState("");

  // Fetch queries

  if (datasetGames === "") {
  }

  if (datasetFilms === "") {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
    )
      .then((response) => response.json())
      .then((data) => setDatasetFilms(data));
  }

  if (datasetKickstarter === "") {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
    )
      .then((response) => response.json())
      .then((data) => setDatasetKickstarter(data));
  }

  useEffect(() => {
    const buildChart = (dataset) => {
      console.log(dataset);

      //   Build canvas

      const height = 1000;
      const width = 1000;
      const padding = 50;

      const canvas = d3
        .select(".treemap-sales")
        .append("svg")
        .attr("class", "treemap-canvas")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height - padding)
        .attr("width", width - padding);

      // Colours

      const colours = [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "violet",
        "pink",
      ];

      // Create treemap

      const root = d3.hierarchy(dataset).sum((d) => d["value"]);

      d3
        .treemap()
        .size([width / 1.5, height / 1.5])
        .padding(2)(root);

      const cell = canvas
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("transform", "translate(" + padding + " , " + padding + ")")
        .style("stroke", "black")
        .style("fill", (d, i) => colours[root.children.indexOf(d.parent)]);

      // Add text

      //   canvas
      //     .append("text")
      //     .selectAll("tspan")
      //     .data(root.leaves())
      //     .enter()
      //     .append("tspan")
      //     .attr("x", (d) => d.x0 + 5)
      //     .attr("y", (d) => d.y0 + 10)
      //     .text((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      //     .attr("font-size", "15px")
      //     .attr("fill", "white");

      console.log(root, root.leaves());
    };

    if (
      datasetFilms !== "" &&
      !document.getElementById("treemap-sales").hasChildNodes()
    ) {
      buildChart(datasetFilms);
    }
  }, [datasetFilms, datasetGames, datasetKickstarter]);

  return <div className="treemap-sales" id="treemap-sales"></div>;
};

export default TreemapSales;

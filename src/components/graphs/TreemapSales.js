import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./TreemapSales.css";

const TreemapSales = (props) => {
  const [datasetGames, setDatasetGames] = useState("");
  const [datasetFilms, setDatasetFilms] = useState("");
  const [datasetKickstarter, setDatasetKickstarter] = useState("");

  //   NOTE: DATA IS CORRECT AS OF AUGUST 2015, and domestic

  // Fetch queries

  if (datasetGames === "") {
    setDatasetGames(null);
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
      //   Build canvas

      const height = 1200;
      const width = 1200;
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
      const fontSize = 6;
      const addG = canvas
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "group")
        .attr("data-width", (d) => d.x1 - d.x0)
        .attr("transform", "translate(" + padding + " , " + padding + ")");
      const addRects = addG
        .append("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("data-width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("stroke", "black")
        .style("fill", (d, i) => colours[root.children.indexOf(d.parent)]);

      const addText = addG
        .append("text")
        .attr("x", (d) => d.x0 + 1)
        .attr("y", (d) => d.y0 + 9)
        .attr("data-width", (d) => d.x1 - d.x0)
        .text((d) => d.data.name)
        .attr("font-size", "0.4em")
        .attr("fill", "black")
        .call(wrapText);

      const wrapText = (selection) => {
        selection.each(function () {
          const node = d3.select(this);
          const rectWidth = +node.attr("data-width");
          console.log(this);
          let word;
          const words = node.text().split(" ").reverse();
          let line = [];
          const x = node.attr("x");
          const y = node.attr("y");
          let tspan = node.text("").append("tspan").attr("x", x).attr("y", y);
          let lineNumber = 0;
          while (words.length > 1) {
            word = words.pop();
            line.push(word);
            tspan.text(line.join(" "));
            const tspanLength = tspan.node().getComputedTextLength();
            if (tspanLength > rectWidth && line.length !== 1) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = addTspan(word);
            }
          }

          addTspan(words.pop());

          function addTspan(text) {
            lineNumber += 1;
            return node
              .append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", `${lineNumber * fontSize}px`)
              .text(text);
          }
        });
      };

      //   Create tooltip

      const tooltip = d3
        .select(".treemap-sales")
        .append("div")
        .attr("class", "treemap-tooltip");

      // Get tooltip html

      const getTooltipHtml = (data) => {
        let name = data.name;
        let category = data.category;
        let value = "$" + new Intl.NumberFormat().format(data.value);
        return (
          "<p class='treemap-tooltip-text'>" +
          "Name: " +
          name +
          "<br> Category: " +
          category +
          "<br> Value: " +
          value +
          "</p>"
        );
      };

      // Add cursor events

      d3.selectAll("rect").on("mouseover", (event) => {
        tooltip
          .transition()
          .duration(0)
          .style("opacity", 1)
          .style("top", event.target.__data__.y0 + 50 + "px")
          .style("left", event.target.__data__.x0 + 100 + "px");

        tooltip.html(getTooltipHtml(event.target.__data__.data));
      });
      d3.selectAll("rect").on("mouseout", () =>
        tooltip.transition().duration(0).style("opacity", 0)
      );
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

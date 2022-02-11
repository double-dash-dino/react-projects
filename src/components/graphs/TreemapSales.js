import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./TreemapSales.css";

const TreemapSales = (props) => {
  const [datasetFilms, setDatasetFilms] = useState("");

  // Fetch queries

  if (datasetFilms === "") {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
    )
      .then((response) => response.json())
      .then((data) => setDatasetFilms(data));
  }

  useEffect(() => {
    const buildChart = (dataset) => {
      // Text wrapping function
      const wrapText = (selection) => {
        selection.each(function () {
          const node = d3.select(this);
          const rectWidth = +node.attr("data-width");
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
      //   Build canvas

      const height = 800;
      const width = 1200;
      const padding = 100;

      const canvas = d3
        .select(".treemap-sales")
        .append("svg")
        .attr("class", "treemap-canvas")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height + padding)
        .attr("width", width + padding);

      // Add titles

      canvas
        .append("text")
        .attr("x", width / 4)
        .attr("y", padding - 40)
        .attr("font-size", "2em")
        .attr("id", "title")
        .text("Top box-office grossing movies");

      canvas
        .append("text")
        .attr("x", width / 4)
        .attr("y", padding - 10)
        .attr("font-size", "1em")
        .attr("id", "description")
        .text("Highest grossing productions (US domestic) as of August 2015");

      // Colours

      const colours = d3.schemeTableau10.slice(0, 7);

      // Create treemap

      const root = d3.hierarchy(dataset).sum((d) => d["value"]);

      d3
        .treemap()
        .size([width / 1.5, height / 1.5])
        .padding(2)(root);
      const fontSize = 8;
      const addG = canvas
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "group")
        .attr("transform", "translate(" + padding + " , " + padding + ")");
      const addRects = addG
        .append("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
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

      //   Add key

      canvas
        .append("g")
        .attr("id", "legend")
        .attr("transform", "translate(" + padding + " , " + padding + ")")
        .selectAll("rect")
        .data(colours)
        .enter()
        .append("rect")
        .attr("x", (d, i) => ((width / 2) * i) / colours.length + 1 + 150)
        .attr("y", height / 2 + 190)
        .style("width", "55px")
        .style("height", "20px")
        .attr("stroke", "black")
        .style("fill", (d) => d);

      d3.select("#legend")
        .selectAll("text")
        .data(dataset.children)
        .enter()
        .append("text")
        .attr("x", (d, i) => ((width / 2) * i) / colours.length + 1 + 151)
        .attr("y", height / 2 + 205)
        .attr("font-size", "10px")
        .text((d) => d.name);
    };

    if (
      datasetFilms !== "" &&
      !document.getElementById("treemap-sales").hasChildNodes()
    ) {
      buildChart(datasetFilms);
    }
  }, [datasetFilms]);

  return <div className="treemap-sales" id="treemap-sales"></div>;
};

export default TreemapSales;

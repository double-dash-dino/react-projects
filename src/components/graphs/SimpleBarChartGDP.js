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




  // Format dates & amounts

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
    let tooltipAmount = "$ "+datasetUS.data[num][1].toLocaleString(undefined) + " Billion";
    
    return (
      tooltipDate+' <br> '+tooltipAmount
    )}


    // Make the graph

  const generateGraph = (dataset) => {

    console.log(dataset.data)
    const height = d3.max(dataset.data, (d) => d[1]) / 30 + 50;
    const width = dataset.data.length * 3;
    const padding = 20

    

    d3.select("svg").attr("height", height).attr("width", width)

    let scale = d3.scaleLinear().domain([1947, 2015]).range([padding, width-padding])
    let x_axis = d3.axisBottom().scale(scale)
    d3.select('svg').append("g").call(x_axis).attr('x','0').attr('y', height)



    d3.select("svg")
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("id", (d, i) => "bar-" + i)
      .attr("class", "chart-bar")
      .attr("height", (d) => d[1] / 20 + "px")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d) => height - d[1] / 30);


let tooltip = d3.select('.simple-bar-chart')
.append('div')
.attr('id', 'tooltip')
.attr('width', "100px")
.attr('height', '100px')
.style("fill", "white")
.attr('class', 'tooltip')





    d3.select(".simple-bar-chart")
      .selectAll(".chart-bar")
      .on("mouseover", (event) => {
        let barID = event.target.id.match(/\d+/);
        tooltip.style('opacity', '100%').html(getToolTipHtml(barID)).attr('top', barID*10+'px').attr('left', '150px')

      });

    d3.select(".simple-bar-chart")
      .selectAll(".chart-bar")
      .on("mouseout", (event) => {
        tooltip.style('opacity', '0%');
      })
    setChartIsBuilt(true);
  };

  useEffect(() => {
    if (datasetUS !== "" && !chartIsBuilt) {
      generateGraph(datasetUS);
    }
  }, [datasetUS, chartIsBuilt]);

  return (
    <div className="simple-bar-chart">
      <svg className="svg-element">
        <g className="plot-area" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default SimpleBarChartGDP;

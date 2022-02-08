import "./D3Graphs.css";
import React, { useState } from "react";
import ClearButton from "../UI/ClearButton";
import SimpleBarChartGDP from "../graphs/SimpleBarChartGDP.js";
import ScatterplotGraphDoping from "../graphs/ScatterplotGraphDoping";
import HeatmapTemperatures from "../graphs/HeatmapTemperatures";
import ChoroplethUSEducation from "../graphs/ChoroplethUSEducation";

const D3Graphs = (props) => {
  const [graphSelected, setGraphSelected] = useState("");

  const clearApp = () => {
    props.onClearApp();
  };

  const selectChangeHandler = (event) => {
    setGraphSelected(event.target.value);
  };

  return (
    <div className="d3-graphs-app">
      <ClearButton onClearApp={clearApp} />
      <h2>Graph selector</h2>
      <label htmlFor="graphs">Pick a type of graph</label>
      <select
        name="graphs"
        className="graph-selector"
        onChange={selectChangeHandler}
      >
        <option>Please select</option>
        <option value="bar-chart">Simple bar chart</option>
        <option value="scatterplot-graph">Scatterplot graph</option>
        <option value="heatmap">Heatmap</option>
        <option value="choropleth">Choropleth</option>
        <option value="treemap-diagram">Treemap diagram</option>
      </select>

      {graphSelected === "bar-chart" && <SimpleBarChartGDP />}
      {graphSelected === "scatterplot-graph" && <ScatterplotGraphDoping />}
      {graphSelected === "heatmap" && <HeatmapTemperatures />}
      {graphSelected === "choropleth" && <ChoroplethUSEducation />}
    </div>
  );
};

export default D3Graphs;

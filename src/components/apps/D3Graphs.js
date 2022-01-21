import "./D3Graphs.css"
import React, {useState} from "react"
import ClearButton from "../UI/ClearButton"
import SimpleBarChartGDP from "../graphs/SimpleBarChartGDP.js"

const D3Graphs = (props) => {

    const [graphSelected, setGraphSelected] = useState('')

const clearApp=() => {
props.onClearApp()
}

const selectChangeHandler=(event)=>{
setGraphSelected(event.target.value)
}


    return (<div className="d3-graphs-app">
        <ClearButton onClearApp={clearApp}/>
    Graph selector
        <label htmlFor="graphs">Pick a type of graph</label>
    <select name="graphs" className="graph-selector" onChange={selectChangeHandler} >
        <option></option>
        <option value="bar-chart">Simple bar chart</option>
        <option value="scatterplot-graph">Scatterplot graph</option>
        <option value="heat-map">Heat map</option>
        <option value="choropleth">Choropleth (density map)</option>
        <option value="treemap-diagram">Treemap diagram</option>
        </select>

{graphSelected === "bar-chart" && <SimpleBarChartGDP />}
    
    </div>)
}



export default D3Graphs;
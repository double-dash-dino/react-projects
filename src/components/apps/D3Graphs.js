import "./D3Graphs.css"
import React, {useState} from "react"
import ClearButton from "../UI/ClearButton"

const D3Graphs = (props) => {

    const [graphSelected, setGraphSelected] = useState('')

const clearApp=() => {
props.onClearApp()
}

const graphPick = () => {
    
}

    return (<div className="d3-graphs-app">
        <ClearButton onClearApp={clearApp}/>
    Graph selector
    <form>
    <select className="graph-selector" placeholder="Select a graph" >
        <label>Pick a type of graph</label>
        <option></option>
        <option value="bar-chart">Simple bar chart</option>
        <option value="scatterplot-graph">Scatterplot graph</option>
        <option value="heat-map">Heat map</option>
        <option value="choropleth">Choropleth (density map)</option>
        <option value="treemap-diagram">Treemap diagram</option>
        
        
        </select>

        <button onClick={graphPick}>Show me the graph!</button>
    </form>
    
    </div>)
}



export default D3Graphs;
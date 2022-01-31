import React, {useState, useEffect} from 'react'
import "./ScatterplotGraphDoping.css"
import * as d3 from 'd3'


const ScatterplotGraphDoping = (props) => {


const [dataset, setDataset] = useState("")

        // Get the data
        if (dataset === ""){
            fetch(
                "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
            )
            .then((response) => response.json())
            .then((data) => {
                setDataset(data)
            })
        }



useEffect(()=>{



const buildChart = () => {

    const height = 500
    const width = 800
    const padding = 20



// Build canvas

d3.select(".scatterplot-graph").append('svg').attr('height', height).attr('width', width).attr('class','canvas')



console.log(dataset)

}


if (!document.getElementById("scatterplot-graph").hasChildNodes() && dataset!==""){
buildChart(dataset)}


},[dataset
])


return (<div className="scatterplot-graph" id="scatterplot-graph"></div>)

}

export default ScatterplotGraphDoping;
import React, {useState, useEffect} from 'react'
import "./ScatterplotGraphDoping.css"
import * as d3 from 'd3'


const ScatterplotGraphDoping = (props) => {

useEffect(()=>{


    const height = 500
    const width = 800
    const padding = 20


// Build canvas

d3.select(".scatterplot-graph").append('svg').attr('height', height).attr('width', width).attr('class','canvas')







},[])


return (<div className="scatterplot-graph"></div>)

}

export default ScatterplotGraphDoping;
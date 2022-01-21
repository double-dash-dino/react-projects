import D3Graphs from '../apps/D3Graphs';
import './SimpleBarChartGDP.css'
import * as d3 from 'd3'


const SimpleBarChartGDP = (props) => {

const dataset = [3,5,6]
const buildGraph = () => {
d3.select('svg')
.attr('background-color', 'white')
// .append('h2')
// .text('test')
// .attr('x', 100)
// .attr('y', 100)
// .attr('color', 'white')
// .attr('background-color', 'white')
// .attr('font-size', '25px')
}
    return (

       
        <div className="simple-bar-chart">
            bar chart here
            <svg
            style={{
                height: 250,
                width: 250,
                marginLeft: "0px",
                marginRight:"0px",
                backgroundColor:'blue'
            }}
            >
<g className="plot-area" />
<g className="x-axis" />
<g className="y-axis" />



            </svg>

            <button onClick={buildGraph}>Build graph</button>
             
        </div>
    )
}

export default SimpleBarChartGDP;
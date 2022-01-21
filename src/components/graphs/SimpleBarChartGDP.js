import D3Graphs from '../apps/D3Graphs';
import './SimpleBarChartGDP.css'
import * as d3 from 'd3'


const SimpleBarChartGDP = (props) => {

const dataset = [3,5,6]
    return (
       
        <div className="simple-bar-chart">
             <script>
            {d3.data(dataset) }
            </script>
            bar chart here
            <svg
            style={{
                height: 500,
                width: "100%",
                marginLeft: "0px",
                marginRight:"0px",
            }}
            >
<g className="plot-area" />
<g className="x-axis" />
<g className="y-axis" />


            </svg>
        </div>
    )
}

export default SimpleBarChartGDP;
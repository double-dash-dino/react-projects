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
        </div>
    )
}

export default SimpleBarChartGDP;
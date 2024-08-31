/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart extends Component {
  render() {
    const options = {
      title: {
        text: "Monthly Sales - 2017",
      },
      axisX: {
        valueFormatString: "DD/MM",
      },
      axisY: {
        title: "Sales (in USD)",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "MMMM",
          type: "line",
          dataPoints: [
            { x: new Date(2017, 1, 1), y: 25060 },
            { x: new Date(2017, 1, 2), y: 27980 },
            { x: new Date(2017, 1, 3), y: 42800 },
            { x: new Date(2017, 1, 4), y: 32400 },
            { x: new Date(2017, 1, 5), y: 35260 },
            { x: new Date(2017, 1, 6), y: 33900 },
            { x: new Date(2017, 1, 7), y: 40000 },
            { x: new Date(2017, 1, 8), y: 52500 },
            { x: new Date(2017, 1, 9), y: 32300 },
            { x: new Date(2017, 1, 10), y: 42000 },
            { x: new Date(2017, 1, 11), y: 37160 },
            { x: new Date(2017, 1, 12), y: 38400 },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default Chart;

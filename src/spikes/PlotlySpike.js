import React from 'react'
import Plot from 'react-plotly.js'
import './PlotlySpike.css'

export default function PlotlySpike() {
  let xArray = []
  let yArray = []
  for (let i = 0; i < 1000; i++) {
    xArray.push(Math.random() * (5 + 1))
    yArray.push(Math.random() * (5 + 1))
  }
  console.log(xArray, yArray)
  return (
    <div>
      <Plot
        className="plot"
        data={[
          {
            x: xArray,
            y: yArray,
            type: 'histogram2dcontour',
            mode: 'markers',
            colorscale: 'Earth',
          },
          // {
          //   type: 'histogram',
          //   x: [1, 2, 3, 2, 2, 2, 2, 1, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5],
          //   marker: { color: 'purple' },
          // },
        ]}
        layout={{
          width: 500,
          height: 500,
          title: 'Plotly Spike',
          xaxis: { title: 'x axis' },
          yaxis: { title: 'y axis' },
        }}
      />
    </div>
  )
}

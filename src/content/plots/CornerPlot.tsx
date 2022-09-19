import { useContext, useRef } from 'react'
import { MathJaxBaseContext } from 'better-react-mathjax'

// Other components
import ContourPlot from './ContourPlot'
import HistogramPlot from './HistogramPlot'
import AxisX from './AxisX'
import AxisY from './AxisY'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'
import { NebulaFighterTheme } from '../../theme/schemes/NebulaFighterTheme'

type CornerPlotPropType = {
  datasets: DatasetConfig[]
  parameters: ParameterConfig[]
  config: PlotConfig
}

function CornerPlot({ datasets, parameters, config }: CornerPlotPropType) {
  /* 
    Corner plot with logic to house the contour and histogram plots. Also renders the axes along the left side and bottom.
    */
  const mathjax = useContext(MathJaxBaseContext)
  const mathjaxTimer = useRef(null)

  // Function to rescan the page for LaTeX elements and rerender them.
  const rerenderMathJax = () => {
    clearTimeout(mathjaxTimer.current)

    mathjaxTimer.current = setTimeout(() => {
      mathjax.promise.then(m => {
        m.typeset()
      })
    }, 500)
  }

  return (
    <div
      id='corner-plot-id'
      className='corner-plot'
      style={{ backgroundColor: NebulaFighterTheme.palette.background.default }}
    >
      {/* For each initial parameter, create a new row containing a Histogram of the 
            current parameter's data and contour plots for the intersections of the current
            parameter and all previous parameters. */}
      {parameters.map((parameter_1: ParameterConfig, index: number) => (
        <div key={`row-${parameter_1.name}`} style={{ display: 'flex' }}>
          {/* Y Axis for this row, do not add for first row since vertical axis do not matter on a histogram */}
          {index > 0 ? (
            <AxisY
              key={`axis-y-${parameter_1.name}`}
              parameter={parameter_1}
              config={config}
              rerender={rerenderMathJax}
            />
          ) : (
            <div style={{ width: config.axis.size }}></div>
          )}

          {/* Contour plots for this parameter and all previous parameters */}
          {parameters.slice(0, index).map(parameter_2 => (
            <ContourPlot
              key={`cont-${parameter_2.name}-${parameter_1.name}`}
              datasets={datasets}
              parameter_x={parameter_2}
              parameter_y={parameter_1}
              config={config}
            />
          ))}

          {/* Histogram for current parameters */}
          <HistogramPlot key={`hist-${parameter_1.name}`} datasets={datasets} parameter={parameter_1} config={config} />
        </div>
      ))}

      {/* X Axis for all parameters */}
      <div key={'axis-x-row'} style={{ display: 'flex' }}>
        {/* This div adds the necessary empty space in the bottom left of the plot. Floating right was causing
                issues for plot image download, since floating takes divs out of page flow   */}
        <div style={{ width: config.axis.size }}></div>
        {parameters.map((parameter_1: ParameterConfig) => (
          <AxisX
            key={`axis-x-${parameter_1.name}`}
            parameter={parameter_1}
            config={config}
            rerender={rerenderMathJax}
          />
        ))}
      </div>
    </div>
  )
}

export default CornerPlot

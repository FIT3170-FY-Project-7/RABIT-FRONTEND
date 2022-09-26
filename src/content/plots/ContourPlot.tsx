import { useRef, useEffect } from 'react'
import { colours } from './constants/Colours'
import ContD3 from './d3/ContourD3'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'

type ContourPlotType = {
    datasets: DatasetConfig[]
    parameter_x: ParameterConfig
    parameter_y: ParameterConfig
    config: PlotConfig
}

const ContourPlot = ({ datasets, parameter_x, parameter_y, config }: ContourPlotType) => {
    /* 
    Renders the contour plots using the D3 library. Calls create() in CountourD3 to render graph SVG.
    */
    const elem = useRef(null)

    useEffect(() => {
        datasets.map(dataset => ContD3.create(elem.current, dataset, parameter_x, parameter_y, config))
        return () => {
            ContD3.destroy(elem.current)
        }
    })

    return (
        <svg
            style={{
                width: config.subplot_size,
                height: config.subplot_size,
                marginRight: config.margin.horizontal,
                marginTop: config.margin.vertical,
                backgroundColor: config.background_color,
                outline: colours.plotBorder
            }}
            ref={elem}
        ></svg>
    )
}

export default ContourPlot

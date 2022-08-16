import { useEffect, useRef } from 'react'
import HistD3 from './d3/HistogramD3'
import { PlotConfig, DatasetConfig, ParameterConfig } from './PlotTypes'

type HistogramPropType = {
    datasets: DatasetConfig[]
    parameter: ParameterConfig
    config: PlotConfig
}

const HistogramPlot = ({ datasets, parameter, config }: HistogramPropType) => {
    /* 

    Renders the histogram plots using the D3 library. Calls create() in HistogramD3 to render graph SVG.

    */
    const elem = useRef(null)

    useEffect(() => {
        datasets.map(dataset => HistD3.create(elem.current, dataset, parameter, config))
        return () => {
            HistD3.destroy(elem.current)
        }
    })

    return (
        <svg
            style={{
                width: config.subplot_size,
                height: config.subplot_size,
                marginRight: config.margin.horizontal,
                marginTop: config.margin.vertical,
                backgroundColor: config.background_color
            }}
            ref={elem}
        ></svg>
    )
}

export default HistogramPlot

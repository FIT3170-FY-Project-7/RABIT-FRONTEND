import { useEffect, useRef } from 'react'
import AxisXD3 from './d3/AxisXD3'
import { PlotConfig, ParameterConfig } from './PlotTypes'

type AxisXPropType = {
    parameter: ParameterConfig
    config: PlotConfig
    rerender: () => void
}

const AxisX = ({ parameter, config, rerender }: AxisXPropType) => {
    /* 
    Renders a single X Axis using the D3 library. Calls create() in AxisXD3 to render axis SVG.
    */
    const elem = useRef(null)

    useEffect(() => {
        AxisXD3.create(elem.current, parameter, config)
        rerender()

        return () => {
            AxisXD3.destroy(elem.current)
        }
    })

    return (
        <div
            style={{
                width: config.subplot_size,
                height: config.axis.size,
                marginRight: config.margin.horizontal,
                borderLeft: '1px solid transparent',
                borderRight: '1px solid transparent'
            }}
            ref={elem}
        ></div>
    )
}

export default AxisX

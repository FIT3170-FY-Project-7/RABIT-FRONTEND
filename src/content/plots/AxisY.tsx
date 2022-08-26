import { useEffect, useRef } from 'react'
import AxisYD3 from './d3/AxisYD3'
import { PlotConfig, ParameterConfig } from './PlotTypes'

type AxisYPropType = {
    parameter: ParameterConfig
    config: PlotConfig
    rerender: () => void
}

const AxisY = ({ parameter, config, rerender }: AxisYPropType) => {
    /* 
    Renders a single Y Axis using the D3 library. Calls create() in AxisYD3 to render axis SVG.
    */
    const elem = useRef(null)

    useEffect(() => {
        AxisYD3.create(elem.current, parameter, config)
        rerender()

        return () => {
            AxisYD3.destroy(elem.current)
        }
    })

    return (
        <div
            style={{
                width: config.axis.size,
                height: config.subplot_size,
                marginTop: config.margin.vertical
            }}
            ref={elem}
        ></div>
    )
}

export default AxisY

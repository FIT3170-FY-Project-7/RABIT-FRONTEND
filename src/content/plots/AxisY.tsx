import { useEffect, useRef } from 'react'
import AxisYD3 from './d3/AxisYD3'

const AxisY = ({ domain, layout, label, rerender }) => {
    /* 

    Renders a single Y Axis using the D3 library. Calls create() in AxisYD3 to render axis SVG.

    */
    const elem = useRef(null)

    useEffect(() => {
        AxisYD3.create(elem.current, layout, domain, label)
        rerender()

        return () => {
            AxisYD3.destroy(elem.current)
        }
    })

    return (
        <div
            style={{
                width: layout.axis.size,
                height: layout.height,
                marginTop: layout.margin.vertical
            }}
            ref={elem}
        ></div>
    )
}

export default AxisY

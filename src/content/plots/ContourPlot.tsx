import { useRef, useEffect } from 'react'
import ContD3 from './d3/ContourD3'

const ContourPlot = ({ x, y, layout }) => {
    /* 

    Renders the contour plots using the D3 library. Calls create() in CountourD3 to render graph SVG.

    */
    const elem = useRef(null)

    useEffect(() => {
        ContD3.create(elem.current, layout, x, y)
        return () => {
            ContD3.destroy(elem.current)
        }
    })

    return (
        <div
            style={{
                width: layout.width,
                height: layout.height,
                marginRight: layout.margin.horizontal,
                marginTop: layout.margin.vertical,
                backgroundColor: '#CFE5FF'
            }}
            ref={elem}
        ></div>
    )
}

export default ContourPlot

import { useEffect, useRef } from "react";
import HistD3 from "./d3/HistogramD3";

const HistogramPlot = ({ x, layout }) => {
    /* 

    Renders the histogram plots using the D3 library. Calls create() in HistogramD3 to render graph SVG.

    */
    const elem = useRef(null);

    useEffect(() => {
        HistD3.create(elem.current, layout, x);
        return () => {
            HistD3.destroy(elem.current);
        };
    });

    return (
        <div
            style={{
                width: layout.width,
                height: layout.height,
                marginRight: layout.margin.horizontal,
                marginTop: layout.margin.vertical,
                backgroundColor: "#CFE5FF",
            }}
            ref={elem}
        ></div>
    );
};

export default HistogramPlot;

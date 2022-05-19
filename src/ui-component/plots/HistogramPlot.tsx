import { useEffect, useRef } from 'react';
import HistD3 from './d3/HistogramD3';

const HistogramPlot = ({ data: x, layout }) => {
    const elem = useRef(null);
    //console.log(x)

    useEffect(() => {
        HistD3.create(elem.current, layout, x);
        return () => {
            HistD3.destroy(elem.current);
        }
    });

    return <div style={{width: layout.width, height: layout.height, margin: (layout.margin.pad + 'px')}} ref={elem}></div>;
};

export default HistogramPlot;

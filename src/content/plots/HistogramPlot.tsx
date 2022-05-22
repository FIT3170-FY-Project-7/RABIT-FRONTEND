import { useEffect, useRef } from 'react';
import HistD3 from './d3/HistogramD3';

const HistogramPlot = ({ x, layout }) => {
    const elem = useRef(null);

    useEffect(() => {
        HistD3.create(elem.current, layout, x);
        return () => {
            HistD3.destroy(elem.current);
        };
    });

    return (
        <div
            style={{ width: layout.width, height: layout.height, marginRight: layout.margin.horizontal, marginTop: layout.margin.vertical }}
            ref={elem}
        ></div>
    );
};

export default HistogramPlot;

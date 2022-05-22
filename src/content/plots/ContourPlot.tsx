import { useRef, useEffect } from 'react';
import ContD3 from './d3/ContourD3';

const ContourPlot = ({ x, y, layout }) => {
    /* 

    Renders the contour plots using the D3 library calls the function in ContourD3 to create the contour plots

    */
    const elem = useRef(null);

    useEffect(() => {
        ContD3.create(elem.current, layout, x, y);
        return () => {
            ContD3.destroy(elem.current);
        };
    });

    return (
        <div
            style={{ width: layout.width, height: layout.height, marginRight: layout.margin.horizontal, marginTop: layout.margin.vertical }}
            ref={elem}
        ></div>
    );
};

export default ContourPlot;

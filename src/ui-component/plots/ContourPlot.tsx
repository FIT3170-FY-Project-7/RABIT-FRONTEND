import { useRef, useEffect } from 'react';
import ContD3 from './d3/ContourD3';

const ContourPlot = ({ x, y, layout }) => {
    const elem = useRef(null);

    useEffect(() => {
        ContD3.create(elem.current, layout, x, y);
        return () => {
            ContD3.destroy(elem.current);
        }
    });

    return <div style={{width: layout.width, height: layout.height, margin: layout.margin.pad + 'px'}}  ref={elem}></div>;
};

export default ContourPlot;

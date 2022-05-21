import { useEffect, useRef } from 'react';
import AxisXD3 from './d3/AxisXD3';

const AxisX = ({ domain, layout, label, rerender }) => {
    const elem = useRef(null);

    useEffect(() => {
        AxisXD3.create(elem.current, layout, domain, label);
        rerender();

        return () => {
            AxisXD3.destroy(elem.current);
        };
    });

    return (
        <div style={{ width: layout.width, height: layout.axis.size, marginRight: layout.margin.horizontal }} ref={elem}></div>
    );
};

export default AxisX;

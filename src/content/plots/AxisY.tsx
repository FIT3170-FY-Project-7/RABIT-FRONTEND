import { useEffect, useRef } from 'react';
import AxisYD3 from './d3/AxisYD3';

const AxisY = ({ domain, layout, label, rerender }) => {
    const elem = useRef(null);

    useEffect(() => {
        AxisYD3.create(elem.current, layout, domain, label);
        rerender();

        return () => {
            AxisYD3.destroy(elem.current);
        };
    });

    return (
        <div style={{ width: layout.axis.size, height: layout.height, marginTop: layout.margin.vertical }} ref={elem}></div>
    );
};

export default AxisY;

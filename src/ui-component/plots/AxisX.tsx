import { useRef, useEffect } from 'react';

const AxisX = ({ domain, layout }) => {
    const elem = useRef(null);

    return <div style={{ width: layout.width, height: layout.axis.size, marginRight: layout.margin.horizontal }}  ref={elem}></div>;
};

export default AxisX;
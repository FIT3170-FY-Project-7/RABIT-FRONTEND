import { useRef, useEffect } from 'react';

const AxisY = ({ domain, layout }) => {
    const elem = useRef(null);

    return <div style={{ width: layout.axis.size, height: layout.height, marginTop: layout.margin.vertical }}  ref={elem}></div>;
};

export default AxisY;
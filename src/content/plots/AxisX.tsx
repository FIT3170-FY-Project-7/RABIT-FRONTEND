import { useEffect, useRef } from "react";
import AxisXD3 from "./d3/AxisXD3";

const AxisX = ({ domain, layout, label, rerender }) => {
	/* 

    Renders a single X Axis using the D3 library. Calls create() in AxisXD3 to render axis SVG.

    */
	const elem = useRef(null);

	useEffect(() => {
		AxisXD3.create(elem.current, layout, domain, label);
		rerender();

		return () => {
			AxisXD3.destroy(elem.current);
		};
	});

	return (
		<div
			style={{
				width: layout.width,
				height: layout.axis.size,
				marginRight: layout.margin.horizontal,
			}}
			ref={elem}
		></div>
	);
};

export default AxisX;

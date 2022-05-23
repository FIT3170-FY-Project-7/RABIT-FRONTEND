import { useState, useEffect } from "react";
import { MathJaxContext } from "better-react-mathjax";
import CornerPlot from "./CornerPlot";
import ParameterSelector from "./ParameterSelector";
import axios from "axios";

function PlotsPage() {
	/* 

    This is the skeleton component for our plots page. It hosts all relevant components for the user to create plots
    including the parameter selectors and the corner plot itself. 

    */

	const [data, setData] = useState({});
	const [parameters, setParameters] = useState([]);
	const [defaultParameters, setDefaultParameters] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/uploads").then(function (response) {
			// console.log(response.data);
			// console.log(Object.keys(response.data));
			console.log("hello");
			console.log(response.data.selected_keys);
			setData(response.data["posterior"]["content"]);
			setParameters(response.data.selected_keys);
			setDefaultParameters(response.data.selected_keys);
		});
	}, []);

	const updateParameters = (_, active) => {
		setParameters(active);
	};

	// Config for MathJax rendering of mathematical symbols
	const config = {
		tex: {
			inlineMath: [
				["$", "$"],
				["\\(", "\\)"],
			],
		},
		startup: {
			typeset: false,
		},
	};

	return (
		<div>
			<MathJaxContext config={config}>
				<ParameterSelector
					items={Object.keys(data)}
					default={defaultParameters}
					onUpdate={updateParameters}
				/>
				<CornerPlot data={data} parameters={parameters} />
			</MathJaxContext>
		</div>
	);
}

export default PlotsPage;

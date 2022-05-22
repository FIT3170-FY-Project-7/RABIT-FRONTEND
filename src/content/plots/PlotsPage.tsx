import { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import CornerPlot from "./CornerPlot";
import ParameterSelector from "./ParameterSelector";

function PlotsPage() {
	/* 

    This is the skeleton component for our plots page. It hosts all relevant components for the user to create plots
    including the parameter selectors and the corner plot itself. 

    */

	// TODO: Delete test data
	// TEST DATA START
	function skewed_normal(skew) {
		let u = 0,
			v = 0;
		while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
		while (v === 0) v = Math.random();
		let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

		num = num / 10.0 + 0.5; // Translate to 0 -> 1
		if (num > 1 || num < 0) return skewed_normal(skew); // resample between 0 and 1 if out of range
		return Math.pow(num, skew);
	}

	let [Array1, Array2, Array3, Array4] = [[], [], [], []];
	for (let i = 0; i < 10000; i++) {
		Array1.push(skewed_normal(0.3));
		Array1.push(skewed_normal(3));
		Array2.push(skewed_normal(0.1));
		Array2.push(skewed_normal(0.5));
		Array3.push(skewed_normal(0.8));
		Array3.push(skewed_normal(1));
		Array4.push(skewed_normal(1.9));
		Array4.push(skewed_normal(2.6));
	}
	const data = {
		"$\\theta_1$": Array1,
		"$t_H$ [$s$]": Array2,
		"$\\Delta\\phi$": Array3,
		"$\\mathcal{M}$ [$M_{\\odot}$]": Array4,
	};
	// TEST DATA END

	const defaultParameters = [
		"$\\theta_1$",
		"$t_H$ [$s$]",
		"$\\Delta\\phi$",
		"$\\mathcal{M}$ [$M_{\\odot}$]",
	];
	const [parameters, setParameters] = useState(defaultParameters);
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

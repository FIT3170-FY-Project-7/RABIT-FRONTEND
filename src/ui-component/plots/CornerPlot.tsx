import { useContext, useRef } from 'react';
import * as d3 from 'd3';
import { MathJaxBaseContext } from 'better-react-mathjax';

// Other components
import ContourPlot from './ContourPlot';
import HistogramPlot from './HistogramPlot';
import AxisX from './AxisX';
import AxisY from './AxisY';

// This component will hold Histogram plots and Contour plots. It is our base component for displaying all 2d plots
// Should receive which parameters are being plotted from parent component (plots view) ../views/pages/plots
// Should have logic for generating the right number of plots and putting them in the right places.

// Current testing props for CornerPlot, can be changed later when we have proper data.
type ConerPlotPropType = {
    data: {
        [key: string]: number[];
    };
    parameters: string[];
};

const corner_plot_size = 800;

const margin = {
    horizontal: 10,
    vertical: 10
};

const axis = {
    size: 100,
    tickSize: 10,
    ticks: 4
};

function CornerPlot({ data, parameters }: ConerPlotPropType) {
    let width = corner_plot_size / parameters.length;
    const layout = { width: width, height: width, margin: margin, axis: axis };
    const mathjax = useContext(MathJaxBaseContext);
    const mathjaxTimer = useRef(null);

    // Function to rescan the page for LaTeX elements and rerender them.
    const rerenderMathJax = () => {
        clearTimeout(mathjaxTimer.current);

        mathjaxTimer.current = setTimeout(() => {
            mathjax.promise.then((m) => {
                m.typeset();
            });
        }, 500);
    };

    return (
        <div style={{ width: 'min-content' }}>
            {/* For each initial parameter, create a new row containing a Histogram of the 
            current parameter's data and contour plots for the intersections of the current
            parameter and all previous parameters. */}
            {parameters.map((parameter_1: string, index: number) => (
                <div key={`row-${parameter_1}`} style={{ display: 'flex' }}>
                    {/* Y Axis for this row */}
                    <AxisY key={`axis-y-${parameter_1}`} domain={d3.extent(data[parameter_1])} layout={layout} label={parameter_1} rerender={rerenderMathJax}/>

                    {/* Contour plots for this parameter and all previous parameters */}
                    {parameters.slice(0, index).map((parameter_2: string) => (
                        <ContourPlot
                            key={`cont-${parameter_2}-${parameter_1}`}
                            x={data[parameter_2]}
                            y={data[parameter_1]}
                            layout={layout}
                        />
                    ))}

                    {/* Histogram for current parameters */}
                    <HistogramPlot key={`hist-${parameter_1}`} x={data[parameter_1]} layout={layout} />
                </div>
            ))}

            {/* X Axis for all parameters */}
            <div key={'axis-x-row'} style={{ display: 'flex', float: 'right' }}>
                {parameters.map((parameter_1: string) => (
                    <AxisX key={`axis-x-${parameter_1}`} domain={d3.extent(data[parameter_1])} layout={layout} label={parameter_1} rerender={rerenderMathJax}/>
                ))}
            </div>
        </div>
    );
}

export default CornerPlot;

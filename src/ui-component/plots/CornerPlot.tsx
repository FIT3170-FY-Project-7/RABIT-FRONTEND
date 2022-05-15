import React from 'react';

// Other components
import ContourPlot from './ContourPlot';
import HistogramPlot from './HistogramPlot';

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
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0
};

function CornerPlot({ data, parameters }: ConerPlotPropType) {
    let width = corner_plot_size / parameters.length;
    const layout = { width: width, height: width, margin: margin };

    return (
        <div>
            {/* For each initial parameter, create a new row containing a Histogram of the 
            current parameter's data and contour plots for the intersections of the current
            parameter and all previous parameters. */}
            {parameters.map((parameter_1: string, index: number) => {
                return (
                    <div style={{ display: 'flex' }}>
                        {/* Contour plots for this paramter and all previous parameters */}
                        {parameters.slice(0, index).map((parameter_2: string) => (
                            <ContourPlot x={data[parameter_2]} y={data[parameter_1]} layout={layout} />
                        ))}
                        {/* Histogram for current parameters */}
                        <HistogramPlot data={data[parameter_1]} layout={layout} />
                    </div>
                );
            })}
        </div>
    );
}

export default CornerPlot;

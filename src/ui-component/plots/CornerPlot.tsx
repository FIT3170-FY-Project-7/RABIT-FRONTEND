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

function CornerPlot({ data, parameters }: ConerPlotPropType) {
    return (
        <div>
            {/* For each initial parameter, create a new row containing a Histogram of the 
            current parameter's data and contour plots for the intersections of the current
            parameter and all previous parameters. */}
            {parameters.map((parameter_1: string, index: number) => {
                return (
                    <div>
                        {/* Contour plots for this paramter and all previous parameters */}
                        {parameters.slice(0, index).map((parameter_2: string) => (
                            <ContourPlot data_1={data[parameter_1]} data_2={data[parameter_2]} />
                        ))}
                        {/* Histogram for current parameters */}
                        <HistogramPlot data={data[parameter_1]} />
                    </div>
                );
            })}
        </div>
    );
}

export default CornerPlot;

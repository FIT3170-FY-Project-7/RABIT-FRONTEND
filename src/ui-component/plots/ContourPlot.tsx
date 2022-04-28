import React from 'react';
import Plot from 'react-plotly.js';
import * as Plotly from 'plotly.js';

// Recieves 2 parameters
type ContourPlotType = {
    x: number[];
    y: number[];

    layout?: Partial<Plotly.Layout>;
};

function ContourPlot({ x, y, layout }: ContourPlotType) {
    return (
        <div>
            <Plot
                data={[
                    {
                        x: x,
                        y: y,
                        type: 'histogram2dcontour',
                        colorscale: 'YlGnBu',
                        showscale: false
                    }
                ]}
                layout={layout}
            />
        </div>
    );
}

export default ContourPlot;

import React from 'react';
import Plot from 'react-plotly.js';
import * as Plotly from 'plotly.js';

// Recieves 2 parameters
type ContourPlotType = {
    x: number[];
    y: number[];

    layout?: Partial<Plotly.Layout>;
};

function ContourPlot({ x, y, updatePlot, layout, x_axis, y_axis }) {
    return (
        <div>
            <Plot
                onRelayout={(figure) => updatePlot(figure, x_axis, y_axis)}
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

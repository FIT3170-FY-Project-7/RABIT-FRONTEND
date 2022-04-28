import React from 'react';
import Plot from 'react-plotly.js';
import * as Plotly from 'plotly.js';

// Recieves 1 parameter

type HistogramPlotType = {
    [k: string]: object[] | object;

    data: number[];

    // The main title of the graph (optional)
    layout?: Partial<Plotly.Layout>;
};

function HistogramPlot({ data, layout }: HistogramPlotType) {
    return (
        <div>
            <Plot
                data={[
                    {
                        x: data,
                        type: 'histogram',
                        marker: { color: '#7aadff' }
                    }
                ]}
                layout={layout}
            />
        </div>
    );
}

export default HistogramPlot;

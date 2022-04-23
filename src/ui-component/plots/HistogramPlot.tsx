import React from 'react';
import Plot from 'react-plotly.js';

// Recieves 1 parameter

type HistogramPlotType = {
    [k: string]: object[] | object;

    data: number[];
    
    // The main title of the graph (optional)
    layout?: {
        [k: string]: string | object | boolean;

        title?: string;
        xaxis?: {
            [k: string]: string | boolean;

            title?: string;
            showticklabels?: boolean; // Determines if the xaxis values are shown or not
        };
        yaxis?: {
            [k: string]: string | boolean;

            title?: string;
            showticklabels?: boolean; // Determines if the yaxis values are shown or not
        };
    };
};

function HistogramPlot({ data, layout }: HistogramPlotType) {
    return (
        <div>
            <Plot
                data={[
                    {
                        x: data,
                        type: 'histogram'
                    }
                ]}
                layout={layout}
            />
        </div>
    );
}

export default HistogramPlot;

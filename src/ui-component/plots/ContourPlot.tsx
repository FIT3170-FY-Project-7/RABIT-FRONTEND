import React from 'react';
import Plot from 'react-plotly.js';

// Recieves 2 parameters
type ContourPlotType = {
    data: number[][];

    layout: {
        [k: string]: string | object | boolean;
        
        // The main title of the graph (optional)
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
        
        showscale: false;
    };
};

function ContourPlot({ data, layout }: ContourPlotType) {
    return (
        <div>
            <Plot
                data={[
                    {
                        z: data,
                        type: 'contour',
                        contours: {
                            // Makes the contour colours smoother
                            coloring: 'heatmap'
                        },
                        showscale: false
                    }
                ]}
                layout={layout}
            />
        </div>
    );
}

export default ContourPlot;

import React from 'react';
import Plot from 'react-plotly.js';

// Recieves 2 parameters
type ContourPlotType = {
    x: number[];
    y: number[];

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

function ContourPlot({ x, y, layout }: ContourPlotType) {
    return (
        <div>
            <Plot
                data={[
                    {
                        x: x,
                        y: y, 
                        type: 'histogram2dcontour',
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

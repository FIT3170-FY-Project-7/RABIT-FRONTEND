import React, { useState } from 'react';

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

    // Pretty default layout. We could change this so there is a default layout like this, and a custom one passed in
    // from the plotpage component, for when special layouts are required programatically (exact range, zooming?)
    const layout = { width: width, height: width, margin: margin, xaxis: { range: [] }, yaxis: { range: [] } };
    const [zoomedLayout, setZoomedLayout] = useState({
        width: width,
        height: width,
        margin: margin,
        xaxis: { range: [] },
        yaxis: { range: [] }
    });
    const [yZoomLayout, setYZoomLayout] = useState({
        width: width,
        height: width,
        margin: margin,
        xaxis: { range: [] },
        yaxis: { range: [] }
    });

    const [xZoomLayout, setXZoomLayout] = useState({
        width: width,
        height: width,
        margin: margin,
        xaxis: { range: [] },
        yaxis: { range: [] }
    });

    const [histogramXZoomLayout, setHistogramXZoomLayout] = useState({
        width: width,
        height: width,
        margin: margin,
        xaxis: { range: [] },
        yaxis: { range: [] }
    });

    const [otherYZoomLayout, setOtherYZoomLayout] = useState({
        width: width,
        height: width,
        margin: margin,
        xaxis: { range: [] },
        yaxis: { range: [] }
    });

    const [xZoomAxis, setXZoomAxis] = useState<number>();
    const [yZoomAxis, setYZoomAxis] = useState<number>();

    function updateZoomRange(figure, x_axis, y_axis) {
        resetLayouts();

        setZoomedLayout({
            ...zoomedLayout,
            xaxis: { range: [figure['xaxis.range[0]'], figure['xaxis.range[1]']] },
            yaxis: { range: [figure['yaxis.range[0]'], figure['yaxis.range[1]']] }
        });
        if (figure['xaxis.range[0]']) {
            setXZoomLayout({
                ...xZoomLayout,
                xaxis: { range: [figure['xaxis.range[0]'], figure['xaxis.range[1]']] }
            });
            setOtherYZoomLayout({
                ...otherYZoomLayout,
                yaxis: { range: [figure['xaxis.range[0]'], figure['xaxis.range[1]']] }
            });
        }
        if (figure['yaxis.range[0]']) {
            setYZoomLayout({
                ...yZoomLayout,
                yaxis: { range: [figure['yaxis.range[0]'], figure['yaxis.range[1]']] }
            });
            setHistogramXZoomLayout({
                ...histogramXZoomLayout,
                xaxis: { range: [figure['yaxis.range[0]'], figure['yaxis.range[1]']] }
            });
        }
        setXZoomAxis(x_axis);
        setYZoomAxis(y_axis);
        // setTimeout(() => printValues(), 4000);
    }

    function printValues() {
        console.log(xZoomLayout, xZoomAxis, yZoomLayout, yZoomAxis);
    }

    function getLayout(xindex, yindex) {
        if (xindex == xZoomAxis && yindex == yZoomAxis) {
            return zoomedLayout;
        } else if (xindex == xZoomAxis) {
            return xZoomLayout;
        } else if (yindex == yZoomAxis) {
            return yZoomLayout;
        } else if (xindex == yZoomAxis) {
            return histogramXZoomLayout;
        } else if (yindex == xZoomAxis) {
            return otherYZoomLayout;
        } else {
            return layout;
        }
    }

    function getHistogramLayout(xindex, yindex) {
        if (xindex == xZoomAxis && yindex == yZoomAxis) {
            return zoomedLayout;
        } else if (xindex == xZoomAxis) {
            return xZoomLayout;
        } else if (yindex == yZoomAxis) {
            return histogramXZoomLayout;
        } else {
            return layout;
        }
    }

    function resetLayouts() {
        setYZoomLayout({
            width: width,
            height: width,
            margin: margin,
            xaxis: { range: [] },
            yaxis: { range: [] }
        });
        setXZoomLayout({
            width: width,
            height: width,
            margin: margin,
            xaxis: { range: [] },
            yaxis: { range: [] }
        });
        setHistogramXZoomLayout({
            width: width,
            height: width,
            margin: margin,
            xaxis: { range: [] },
            yaxis: { range: [] }
        });
        setOtherYZoomLayout({
            width: width,
            height: width,
            margin: margin,
            xaxis: { range: [] },
            yaxis: { range: [] }
        });
    }

    return (
        <div>
            {/* For each initial parameter, create a new row containing a Histogram of the 
            current parameter's data and contour plots for the intersections of the current
            parameter and all previous parameters. */}
            {parameters.map((parameter_1: string, yindex: number) => {
                return (
                    <div key={parameter_1} style={{ display: 'flex' }}>
                        {/* Contour plots for this paramter and all previous parameters */}
                        {parameters.slice(0, yindex).map((parameter_2: string, xindex: number) => (
                            <ContourPlot
                                key={parameter_1 + parameter_2}
                                x={data[parameter_2]}
                                y={data[parameter_1]}
                                layout={getLayout(xindex, yindex)}
                                updatePlot={updateZoomRange}
                                x_axis={xindex}
                                y_axis={yindex}
                            />
                        ))}
                        {/* Histogram for current parameters */}
                        <HistogramPlot data={data[parameter_1]} layout={getHistogramLayout(yindex, yindex)} />
                    </div>
                );
            })}
        </div>
    );
}

export default CornerPlot;

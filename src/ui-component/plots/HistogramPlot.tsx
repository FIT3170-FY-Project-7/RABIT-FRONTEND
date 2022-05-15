import { useEffect, useRef } from 'react';
import HistD3 from './d3/HistogramD3';

// Recieves 1 parameter

// type HistogramPlotType = {
//     [k: string]: object[] | object;

//     data: number[];

//     // The main title of the graph (optional)
//     layout?: Partial<Plotly.Layout>;
// };

// function HistogramPlot({ data, layout }: HistogramPlotType) {
//     return (
//         <div>
//             <Plot
//                 data={[
//                     {
//                         x: data,
//                         type: 'histogram',
//                         marker: { color: '#7aadff' }
//                     }
//                 ]}
//                 layout={layout}
//             />
//         </div>
//     );
// }

const HistogramPlot = ({ data: x, layout }) => {
    const elem = useRef(null);

    useEffect(() => {
        HistD3.create(elem.current, layout, x);
        return () => {
            HistD3.destroy(elem.current);
        }
    });

    return <div ref={elem}></div>;
};

export default HistogramPlot;

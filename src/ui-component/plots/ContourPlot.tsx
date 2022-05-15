import { useRef, useEffect } from 'react';
import ContD3 from './d3/ContourD3';

// // Recieves 2 parameters
// type ContourPlotType = {
//     x: number[];
//     y: number[];

//     layout?: Partial<Plotly.Layout>;
// };

// function ContourPlot({ x, y, layout }: ContourPlotType) {
//     return (
//         <div>
//             <Plot
//                 data={[
//                     {
//                         x: x,
//                         y: y,
//                         type: 'histogram2dcontour',
//                         colorscale: 'YlGnBu',
//                         showscale: false
//                     }
//                 ]}
//                 layout={layout}
//             />
//         </div>
//     );
// }

const ContourPlot = ({ x, y, layout }) => {
    const elem = useRef(null);

    useEffect(() => {
        ContD3.create(elem.current, layout, x, y);
        return () => {
            ContD3.destroy(elem.current);
        }
    });

    return <div ref={elem}></div>;
};

export default ContourPlot;

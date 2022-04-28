import React from 'react';
import CornerPlot from '../../../../ui-component/plots/CornerPlot';
import ParameterSelectors from '../../../../ui-component/plots/ParameterSelectors';

// This is the skeleton component for our plots page. It will host all relevant components for the user to create plots
// including the parameter selectors and the corner plot itself.

function PlotsPage() {
    // TODO: Delete test data

    // TEST DATA START
    let [Array1, Array2, Array3, Array4] = [[], [], [], []];
    for (let i = 0; i < 2000; i++) {
        Array1.push(Math.random() * (5 + 1));
        Array2.push(Math.random() * (5 + 1));
        Array3.push(Math.random() * (5 + 1));
        Array4.push(Math.random() * (5 + 1));
    }
    const data = {
        key1: Array1,
        key2: Array2,
        key3: Array3,
        key4: Array4
    };

    const parameters = ['key1', 'key2', 'key3', 'key4'];
    // TEST DATA END

    return (
        <div>
            <ParameterSelectors />
            <CornerPlot data={data} parameters={parameters} />
        </div>
    );
}

export default PlotsPage;

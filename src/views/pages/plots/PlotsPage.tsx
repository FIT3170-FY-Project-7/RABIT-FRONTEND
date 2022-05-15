import React from 'react';
import CornerPlot from '../../../ui-component/plots/CornerPlot';
import ParameterSelectors from '../../../ui-component/plots/ParameterSelectors';

// This is the skeleton component for our plots page. It will host all relevant components for the user to create plots
// including the parameter selectors and the corner plot itself.

function PlotsPage() {
    // TODO: Delete test data
    function skewed_normal(skew) {
        let u = 0,
            v = 0;
        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return skewed_normal(skew); // resample between 0 and 1 if out of range
        return Math.pow(num, skew);
    }

    // TEST DATA START
    let [Array1, Array2, Array3, Array4] = [[], [], [], []];
    for (let i = 0; i < 1000000; i++) {
        Array1.push(skewed_normal(0.3));
        Array1.push(skewed_normal(3));
        Array2.push(skewed_normal(0.1));
        Array2.push(skewed_normal(0.5));
        Array3.push(skewed_normal(0.8));
        Array3.push(skewed_normal(1));
        Array4.push(skewed_normal(1.9));
        Array4.push(skewed_normal(2.6));
    }
    const data = {
        key1: Array1,
        key2: Array2,
        key3: Array3,
        key4: Array4
    };

    const parameters = ['key1', 'key4', 'key3', 'key2'];
    // TEST DATA END

    return (
        <div>
            <ParameterSelectors />
            <CornerPlot data={data} parameters={parameters} />
        </div>
    );
}

export default PlotsPage;

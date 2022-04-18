import React from 'react';
import CornerPlot from '../../../../ui-component/plots/CornerPlot';
import ParameterSelectors from '../../../../ui-component/plots/ParameterSelectors';

// This is the skeleton component for our plots page. It will host all relevant components for the user to create plots
// including the parameter selectors and the corner plot itself.

function PlotsPage() {
    return (
        <div>
            <ParameterSelectors />
            <CornerPlot />
        </div>
    );
}

export default PlotsPage;

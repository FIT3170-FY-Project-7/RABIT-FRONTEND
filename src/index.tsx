// ==============================|| IMPORTS ||============================== //

// Third-party.
import * as React from 'react';
import { createRoot } from 'react-dom/client';

// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root      = createRoot(container);
root.render(<h1>Hello world!</h1>);

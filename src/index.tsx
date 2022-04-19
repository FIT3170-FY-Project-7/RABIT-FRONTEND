// ==============================|| IMPORTS ||============================== //

// Third-party.
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Berry
import App from 'berry/App';
import { store } from 'berry/store';
import * as serviceWorker from 'berry/serviceWorker.js';
import 'berry/assets/scss/style.scss';

// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root      = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

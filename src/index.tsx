// ==============================|| IMPORTS ||============================== //

// Third-party.
import * as React from 'react';
import { createRoot } from 'react-dom/client';

// Main app.
import App from '../template/tokyo/App';

// Required by Tokyo.
import '../template/tokyo/utils/chart';
import * as serviceWorker from '../template/tokyo/serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from '../template/tokyo/contexts/SidebarContext';

// ==============================|| REACT DOM RENDER ||============================== //

// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root      = createRoot(container);
root.render(
    <HelmetProvider>
        <SidebarProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SidebarProvider>
    </HelmetProvider>
);

// TODO: Consider viability of registering the service worker, which will allow for offline use but has some caveats (see serviceWorker.ts).
serviceWorker.unregister();

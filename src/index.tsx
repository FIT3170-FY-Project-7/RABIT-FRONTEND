// ==============================|| IMPORTS ||============================== //

// Third-party.
import * as React from 'react';
import { createRoot } from 'react-dom/client';

// Main app.
import App from './tokyo/App';

// Required by Tokyo.
import './tokyo/utils/chart';
import * as serviceWorker from './tokyo/serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './tokyo/contexts/SidebarContext';

// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root      = createRoot(container);
root.render(<HelmetProvider>
        <SidebarProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SidebarProvider>
    </HelmetProvider>
);

// TODO: Consider viability of registering the service worker, which will allow for offline use but has some caveats.
serviceWorker.unregister();

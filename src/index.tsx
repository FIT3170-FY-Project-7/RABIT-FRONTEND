// ==============================|| IMPORTS ||============================== //

// React.
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import { BrowserRouter } from 'react-router-dom'

// App.
import App from './App'
import { SidebarProvider } from './contexts/SidebarContext'
import * as serviceWorker from './serviceWorker'

// Styling.
import 'nprogress/nprogress.css'

// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <HelmetProvider>
        <SidebarProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SidebarProvider>
    </HelmetProvider>
)

// TODO: Consider viability of registering the service worker, which will allow for offline use but has some caveats (see serviceWorker.ts).
serviceWorker.unregister()

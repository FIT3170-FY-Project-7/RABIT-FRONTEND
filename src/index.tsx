// ==============================|| IMPORTS ||============================== //

// React.
import { createRoot     } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { HashRouter     } from 'react-router-dom'

// App.
import App from './App'
import * as serviceWorker from './serviceWorker'
import { SidebarProvider } from './contexts/SidebarContext'

// Styling.
import 'nprogress/nprogress.css'

// ==============================|| REACT DOM RENDER ||============================== //

console.log("test")

const container = document.getElementById('root')
const root      = createRoot(container)
root.render(
    <HelmetProvider>
        <SidebarProvider>
            <HashRouter >
                <App />
            </HashRouter >
        </SidebarProvider>
    </HelmetProvider>
)

// TODO: Consider viability of registering the service worker, which will allow for offline use but has some caveats (see serviceWorker.ts).
serviceWorker.unregister()

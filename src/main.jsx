import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { SeoProvider } from './providers/SeoProvider'

/* The build prerenders each page's head tags (marked data-rh) for crawlers
   that don't run JS. react-helmet-async 3 on React 19 hoists its own tags
   and never removes those, so drop them before the app renders its own,
   otherwise every page ends up with two titles, canonicals and JSON-LDs. */
document.querySelectorAll('head [data-rh]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SeoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SeoProvider>
    </HelmetProvider>
  </StrictMode>,
)

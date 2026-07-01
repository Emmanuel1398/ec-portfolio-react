import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { SeoProvider } from './providers/SeoProvider'

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

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import DeferredVercelTelemetry from './components/analytics/DeferredVercelTelemetry'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root is missing from index.html')

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <DeferredVercelTelemetry />
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree)
} else {
  createRoot(rootElement).render(tree)
}

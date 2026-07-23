import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import DeferredVercelTelemetry from './components/analytics/DeferredVercelTelemetry'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root is missing from index.html')

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <DeferredVercelTelemetry />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DeferredVercelTelemetry from './components/analytics/DeferredVercelTelemetry.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <DeferredVercelTelemetry />
  </StrictMode>,
)

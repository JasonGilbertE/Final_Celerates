import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './rating.css'
import App from './Rating.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

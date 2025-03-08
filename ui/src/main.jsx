import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from './App.jsx'
import "./App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

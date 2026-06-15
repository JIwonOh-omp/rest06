import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './components.css'
import './themes/honey.css'
import './themes/terracotta.css'
import './themes/berry.css'
import './themes/apricot.css'
import './themes/dark.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

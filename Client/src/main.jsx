import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // added: provide auth context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* added: wrap app with provider */}
      <App />
    </AuthProvider>
  </StrictMode>,
)

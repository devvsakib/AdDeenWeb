import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { inject } from '@vercel/analytics';
import Construction from './components/Construction.jsx';
import { BrowserRouter } from 'react-router-dom';
inject();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Construction />
      <App />
    </BrowserRouter>
  </StrictMode>,
)

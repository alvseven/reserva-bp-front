import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './app'

import './index.css'
import { Toaster } from './components/ui/toaster'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

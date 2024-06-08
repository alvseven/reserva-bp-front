import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import AuthProvider from './providers/auth'
import App from './app'

import { Toaster } from './components/ui/toaster'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ToastProvider } from '../context/ToastContext.jsx'
import StoreContextProvider from '../context/StoreContext.jsx'
import './i18n.js'   
createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <StoreContextProvider>
    <ToastProvider>

      <App />
    </ToastProvider>

   </StoreContextProvider>
 </BrowserRouter>
  
)

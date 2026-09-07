import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SavedRoomsProvider } from './contexts/SavedRoomsContext'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SavedRoomsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SavedRoomsProvider>
    </QueryClientProvider>
  </StrictMode>,
)

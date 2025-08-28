import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Root/router'
import { ThemeProvider } from './components/Theme/theme-provider'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} defaultTheme="system" storageKey="vite-ui-theme"></RouterProvider>
        <ToastContainer></ToastContainer>
      </ThemeProvider>
    </QueryClientProvider>

  </StrictMode>,
)

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
import AuthProvider from './Provider/AuthProvider'
import DrawCursor from './components/nurui/draw-cursor'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastContainer></ToastContainer>
          <DrawCursor
            type='drawAlways'
            strokeColor='#80eeb4'
            strokeWidth={10}
            followEffect={true}
          ></DrawCursor>
          <RouterProvider router={router} defaultTheme="system" storageKey="vite-ui-theme"></RouterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>

  </StrictMode>,
)

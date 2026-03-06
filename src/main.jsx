import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { store } from './redux/store.ts'
import AppRoutes from './config/AppRoutes.tsx'
import { Layout } from './components/Layout.tsx'

// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

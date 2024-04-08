
import ReactDOM from 'react-dom/client'
import './index.scss'
import { router } from './Router.tsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  // </React.StrictMode>,
)

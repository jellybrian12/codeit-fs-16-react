import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/global.scss'
import App from './App.jsx'
import { PostsProvider } from './contexts/PostsContext.jsx'

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <BrowserRouter>
      <PostsProvider>
        <App />
      </PostsProvider>
    </BrowserRouter>
  </StrictMode>,
)

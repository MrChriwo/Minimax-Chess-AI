import './assets/main.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MinimaxProvider } from './services/context/MinimaxProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MinimaxProvider>
      <App />
    </MinimaxProvider>
  </React.StrictMode>
)

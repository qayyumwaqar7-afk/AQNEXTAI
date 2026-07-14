import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { StatsProvider } from './components/StatsContext';
import { AuthProvider } from './components/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StatsProvider>
          <App />
        </StatsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

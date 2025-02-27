import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { DebugPanel } from './components/debug/DebugPanel';
import { theme } from './theme';
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            {process.env.NODE_ENV === 'development' && <DebugPanel />}
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App; 
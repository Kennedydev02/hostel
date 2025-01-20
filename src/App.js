import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { CheckInProvider } from './contexts/CheckInContext';
import WizardForm from './components/wizard/WizardForm';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CheckInProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WizardForm />} />
            <Route path="/personal-details" element={<WizardForm />} />
            <Route path="/date-selection" element={<WizardForm />} />
            <Route path="/fee-calculator" element={<WizardForm />} />
            <Route path="/payment-options" element={<WizardForm />} />
            <Route path="/confirmation" element={<WizardForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CheckInProvider>
    </ThemeProvider>
  );
}

export default App; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Layout from './components/common/Layout';
import WelcomeScreen from './components/wizard/WelcomeScreen';
import PersonalDetails from './components/wizard/PersonalDetails';
import DateSelection from './components/wizard/DateSelection';
import FeeCalculator from './components/wizard/FeeCalculator';
import PaymentOptions from './components/wizard/PaymentOptions';
import { CheckInProvider } from './contexts/CheckInContext';
import Confirmation from './components/wizard/Confirmation';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CheckInProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/date-selection" element={<DateSelection />} />
            <Route path="/fee-calculator" element={<FeeCalculator />} />
            <Route path="/payment-options" element={<PaymentOptions />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </Router>
      </CheckInProvider>
    </ThemeProvider>
  );
}

export default App; 
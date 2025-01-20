import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Paper, Stepper, Step, StepLabel } from '@mui/material';
import WelcomeScreen from './WelcomeScreen';
import DateSelection from './DateSelection';
import PersonalDetails from './PersonalDetails';
import FeeCalculator from './FeeCalculator';
import PaymentOptions from './PaymentOptions';
import Confirmation from './Confirmation';

const steps = [
  'Welcome',
  'Personal Details',
  'Select Dates',
  'Fee Calculation',
  'Payment',
  'Confirmation'
];

const WizardForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    dates: {},
    personalDetails: {},
    fees: {},
    payment: {}
  });

  const getActiveStep = () => {
    switch (location.pathname) {
      case '/check-in':
        return 0;
      case '/check-in/personal-details':
        return 1;
      case '/check-in/date-selection':
        return 2;
      case '/check-in/fee-calculator':
        return 3;
      case '/check-in/payment-options':
        return 4;
      case '/check-in/confirmation':
        return 5;
      default:
        return 0;
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Stepper activeStep={getActiveStep()} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/personal-details" element={
            <PersonalDetails formData={formData} setFormData={setFormData} />
          } />
          <Route path="/date-selection" element={
            <DateSelection formData={formData} setFormData={setFormData} />
          } />
          <Route path="/fee-calculator" element={
            <FeeCalculator formData={formData} setFormData={setFormData} />
          } />
          <Route path="/payment-options" element={
            <PaymentOptions formData={formData} setFormData={setFormData} />
          } />
          <Route path="/confirmation" element={
            <Confirmation formData={formData} />
          } />
        </Routes>
      </Paper>
    </Container>
  );
};

export default WizardForm; 
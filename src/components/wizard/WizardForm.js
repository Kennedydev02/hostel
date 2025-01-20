import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
      case '/':
        return 0;
      case '/personal-details':
        return 1;
      case '/date-selection':
        return 2;
      case '/fee-calculator':
        return 3;
      case '/payment-options':
        return 4;
      case '/confirmation':
        return 5;
      default:
        return 0;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <WelcomeScreen />;
      case 1:
        return <PersonalDetails formData={formData} setFormData={setFormData} />;
      case 2:
        return <DateSelection formData={formData} setFormData={setFormData} />;
      case 3:
        return <FeeCalculator formData={formData} setFormData={setFormData} />;
      case 4:
        return <PaymentOptions formData={formData} setFormData={setFormData} />;
      case 5:
        return <Confirmation formData={formData} />;
      default:
        return 'Unknown step';
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
        {getStepContent(getActiveStep())}
      </Paper>
    </Container>
  );
};

export default WizardForm; 
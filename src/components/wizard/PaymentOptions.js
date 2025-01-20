import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckIn } from '../../contexts/CheckInContext';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Card,
  CardContent,
  Radio,
  Collapse,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  AccountBalanceWallet,
  CheckCircle,
} from '@mui/icons-material';

const PaymentOptions = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { checkInData, updateCheckInData } = useCheckIn();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const paymentOptions = [
    {
      id: 'office',
      title: 'Pay at Office',
      description: 'Pay when you arrive',
      icon: <AccountBalanceWallet sx={{ fontSize: 28, color: 'primary.main' }} />,
    },
    {
      id: 'paid',
      title: 'Paid',
      description: 'Payment already made',
      icon: <CheckCircle sx={{ fontSize: 28, color: 'primary.main' }} />,
    },
  ];

  const paidOptions = [
    { value: 'zelle', label: 'Paid via Zelle' },
    { value: 'office', label: 'Paid at Office' },
  ];

  const handleNext = () => {
    updateCheckInData('payment', { 
      method: paymentMethod,
      type: paymentType 
    });
    navigate('../confirmation');
  };

  const handleBack = () => {
    navigate('../fee-calculator');
  };

  const formatCurrency = (amount) => {
    return Number(amount).toFixed(2);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minHeight: 'fit-content',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
          Payment Options
        </Typography>

        <Typography variant="body1" align="center" sx={{ color: 'text.secondary' }}>
          Choose your payment status
        </Typography>

        <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" align="center">
              Total Amount: ${formatCurrency(checkInData?.fees?.totalAmount || 0)}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {paymentOptions.map((option) => (
            <Card
              key={option.id}
              sx={{
                cursor: 'pointer',
                border: '2px solid',
                borderColor: paymentMethod === option.id ? 'primary.main' : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.light',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => {
                setPaymentMethod(option.id);
                if (option.id !== 'paid') setPaymentType('');
              }}
            >
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
              }}>
                <Radio
                  checked={paymentMethod === option.id}
                  onChange={() => {
                    setPaymentMethod(option.id);
                    if (option.id !== 'paid') setPaymentType('');
                  }}
                  value={option.id}
                  name="payment-method"
                  sx={{ color: 'primary.main' }}
                />
                {option.icon}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </Box>
              </CardContent>

              <Collapse in={option.id === 'paid' && paymentMethod === 'paid'}>
                <CardContent sx={{ pt: 0 }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      {paidOptions.map((paidOption) => (
                        <FormControlLabel
                          key={paidOption.value}
                          value={paidOption.value}
                          control={<Radio />}
                          label={paidOption.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mt: 'auto',
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ flex: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={!paymentMethod || (paymentMethod === 'paid' && !paymentType)}
            sx={{ 
              flex: 1,
              background: paymentMethod ? 'linear-gradient(45deg, #1976d2, #2196f3)' : undefined,
              '&:not(:disabled):hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
              }
            }}
          >
            Next
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Step 4 of 4
        </Typography>
      </Paper>
    </Container>
  );
};

export default PaymentOptions; 
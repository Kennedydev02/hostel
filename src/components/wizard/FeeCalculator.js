import React, { useState, useEffect } from 'react';
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
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CalendarMonth,
  NightsStay,
} from '@mui/icons-material';

const DAILY_RATE = 50;

const FeeCalculator = () => {
  const navigate = useNavigate();
  const { checkInData, updateCheckInData } = useCheckIn();
  const [fees, setFees] = useState({
    numberOfDays: 0,
    totalAmount: 0
  });

  useEffect(() => {
    if (checkInData?.dates?.checkIn && checkInData?.dates?.checkOut) {
      const start = new Date(checkInData.dates.checkIn);
      const end = new Date(checkInData.dates.checkOut);
      
      const diffTime = Math.abs(end - start);
      const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalAmount = numberOfDays * DAILY_RATE;

      const newFees = {
        numberOfDays,
        totalAmount
      };

      setFees(newFees);
      updateCheckInData('fees', newFees);
    }
  }, [checkInData.dates, updateCheckInData]);

  const formatCurrency = (amount) => {
    return Number(amount).toFixed(2);
  };

  const handleNext = async () => {
    try {
      const bookingData = {
        personalDetails: checkInData.personalDetails,
        dates: checkInData.dates,
        fees: {
          numberOfDays: fees.numberOfDays,
          totalAmount: fees.totalAmount
        },
        payment: {
          method: 'Pay at Office',
          status: 'pending'
        }
      };

      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        navigate('/payment-options');
      }
    } catch (error) {
      console.error('Error saving booking:', error);
    }
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
          Fee Summary
        </Typography>

        <Typography variant="body1" align="center" sx={{ color: 'text.secondary' }}>
          Review your booking fees
        </Typography>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonth sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Check-in
                </Typography>
                <Typography variant="body1">
                  {checkInData?.dates?.checkIn || 'Not selected'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Check-out
                </Typography>
                <Typography variant="body1">
                  {checkInData?.dates?.checkOut || 'Not selected'}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NightsStay sx={{ color: 'primary.main', mr: 1 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1">
                  {fees.numberOfDays} day{fees.numberOfDays !== 1 ? 's' : ''} × ${DAILY_RATE}
                </Typography>
              </Box>
              <Typography variant="body1">
                ${formatCurrency(fees.totalAmount)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">
                  Total Amount
                </Typography>
              </Box>
              <Typography variant="h6" color="primary.main">
                ${formatCurrency(fees.totalAmount)}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mt: 'auto',
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/date-selection')}
            sx={{ flex: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={fees.totalAmount <= 0}
            sx={{ 
              flex: 1,
              background: 'linear-gradient(45deg, #1976d2, #2196f3)',
              '&:hover': {
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
          Step 4 of 5
        </Typography>
      </Paper>
    </Container>
  );
};

export default FeeCalculator; 
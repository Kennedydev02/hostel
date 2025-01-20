import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckIn } from '../../contexts/CheckInContext';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  NightsStay,
} from '@mui/icons-material';

const DateSelection = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { checkInData, updateCheckInData } = useCheckIn();
  const [dates, setDates] = useState({
    checkIn: checkInData?.dates?.checkIn || '',
    checkOut: checkInData?.dates?.checkOut || '',
  });
  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      const checkInDate = new Date(dates.checkIn);
      const checkOutDate = new Date(dates.checkOut);
      if (checkOutDate > checkInDate) {
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setNumberOfNights(nights);
      }
    }
  }, [dates.checkIn, dates.checkOut]);

  const handleDateChange = (field) => (event) => {
    setDates(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleNext = () => {
    if (dates.checkIn && dates.checkOut && numberOfNights > 0) {
      updateCheckInData('dates', dates);
      navigate('../fee-calculator');
    }
  };

  const handleBack = () => {
    navigate('../personal-details');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
          Select Your Dates
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Choose your check-in and check-out dates
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          <TextField
            fullWidth
            label="Check-in Date"
            type="date"
            value={dates.checkIn}
            onChange={handleDateChange('checkIn')}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
          />

          <TextField
            fullWidth
            label="Check-out Date"
            type="date"
            value={dates.checkOut}
            onChange={handleDateChange('checkOut')}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: dates.checkIn || today }}
          />

          {numberOfNights > 0 && (
            <Card sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '12px' }}>
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'center',
              }}>
                <NightsStay />
                <Typography variant="h6">
                  {numberOfNights} night{numberOfNights !== 1 ? 's' : ''}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
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
            disabled={!dates.checkIn || !dates.checkOut || numberOfNights <= 0}
            sx={{ 
              flex: 1,
              background: 'linear-gradient(45deg, #1976d2, #2196f3)',
              '&:disabled': {
                background: '#ccc',
              }
            }}
          >
            Next
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            mt: 2,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Step 3 of 5
        </Typography>
      </Paper>
    </Container>
  );
};

export default DateSelection; 
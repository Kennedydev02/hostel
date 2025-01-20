import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { CalendarToday, AttachMoney } from '@mui/icons-material';

const FeeCalculator = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  
  const checkIn = formData?.dates?.checkIn ? new Date(formData.dates.checkIn) : null;
  const checkOut = formData?.dates?.checkOut ? new Date(formData.dates.checkOut) : null;
  
  const numberOfDays = (checkIn && checkOut) ? 
    Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0;
  const ratePerDay = 50;
  const totalAmount = numberOfDays * ratePerDay;

  const handleNextClick = () => {
    setFormData(prev => ({
      ...prev,
      fees: {
        numberOfDays,
        ratePerDay,
        totalAmount
      }
    }));
    navigate('/payment-options');
  };

  const handleBack = () => {
    navigate('/date-selection');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
          Fee Summary
        </Typography>

        <Typography variant="body1" align="center" sx={{ color: 'text.secondary' }}>
          Review your booking fees
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText primary="Check-in" secondary={checkIn ? checkIn.toLocaleDateString() : 'Not selected'} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText primary="Check-out" secondary={checkOut ? checkOut.toLocaleDateString() : 'Not selected'} />
          </ListItem>
        </List>

        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          {numberOfDays} day{numberOfDays !== 1 ? 's' : ''} × ${ratePerDay}
        </Typography>
        <Typography variant="h6" color="primary.main">
          ${totalAmount.toFixed(2)}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNextClick}
            color="primary"
          >
            Next
          </Button>
        </Box>
        <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 2 }}>
          Step 4 of 5
        </Typography>
      </Paper>
    </Container>
  );
};

export default FeeCalculator; 
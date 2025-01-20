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
  ListItemText
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

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
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Fee Summary
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Review your booking fees
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CalendarToday color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Check-in"
              secondary={checkIn ? checkIn.toLocaleDateString() : ''}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CalendarToday color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Check-out"
              secondary={checkOut ? checkOut.toLocaleDateString() : ''}
            />
          </ListItem>

          <ListItem>
            <ListItemText 
              primary={`${numberOfDays} day${numberOfDays > 1 ? 's' : ''} × $${ratePerDay}`}
              secondary={`Total: $${totalAmount.toFixed(2)}`}
            />
          </ListItem>
        </List>

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
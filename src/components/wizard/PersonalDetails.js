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
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Person,
  Email,
  Phone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { checkInData, updateCheckInData } = useCheckIn();
  const [formData, setFormData] = useState({
    fullName: checkInData?.personalDetails?.fullName || '',
    email: checkInData?.personalDetails?.email || '',
    phone: checkInData?.personalDetails?.phone || '',
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name (at least 3 characters)
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone (at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (validateForm()) {
      updateCheckInData('personalDetails', formData);
      navigate('/date-selection');
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
          Personal Details
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 2, color: 'text.secondary' }}>
          Please provide your information to continue
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color={errors.fullName ? 'error' : 'primary'} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color={errors.email ? 'error' : 'primary'} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color={errors.phone ? 'error' : 'primary'} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Alert severity="info" sx={{ mt: 1 }}>
          All information will be kept confidential and secure
        </Alert>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mt: 2,
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{ flex: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={!isFormValid}
            sx={{ 
              flex: 1,
              background: isFormValid ? 'linear-gradient(45deg, #1976d2, #2196f3)' : undefined,
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
            mt: 1,
          }}
        >
          Step 2 of 4
        </Typography>
      </Paper>
    </Container>
  );
};

export default PersonalDetails; 
import React, { useState, useEffect, useCallback } from 'react';
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

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

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
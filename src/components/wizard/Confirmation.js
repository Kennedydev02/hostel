import React from 'react';
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
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Person,
  Email,
  Phone,
  CalendarMonth,
  Payment,
  AttachMoney,
  Download,
  Share,
} from '@mui/icons-material';

const Confirmation = () => {
  const navigate = useNavigate();
  const { checkInData } = useCheckIn();

  const formatCurrency = (amount) => {
    return Number(amount).toFixed(2);
  };

  const handleFinish = () => {
    // Here you can add API call to submit the data
    navigate('/welcome');
  };

  const handleDownload = () => {
    // Implementation for downloading booking summary
    console.log('Downloading booking summary...');
  };

  const handleShare = () => {
    // Implementation for sharing booking summary
    console.log('Sharing booking summary...');
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
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Booking Summary
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please review your booking details
          </Typography>
        </Box>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1">
                  {checkInData?.personalDetails?.fullName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="body1">
                  {checkInData?.personalDetails?.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="body1">
                  {checkInData?.personalDetails?.phone}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonth sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Check-in Date
                </Typography>
                <Typography variant="body1">
                  {checkInData?.dates?.checkIn}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Check-out Date
                </Typography>
                <Typography variant="body1">
                  {checkInData?.dates?.checkOut}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoney sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="body1">
                  ${formatCurrency(checkInData?.fees?.totalAmount || 0)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Payment sx={{ color: 'primary.main', mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Payment Status
                </Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {checkInData?.payment?.method === 'paid' 
                    ? `Paid (${checkInData?.payment?.type === 'zelle' ? 'via Zelle' : 'at Office'})` 
                    : 'Pay at Office'}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mt: 2,
          mb: 2
        }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{ flex: 1 }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={handleShare}
            sx={{ flex: 1 }}
          >
            Share
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mt: 2,
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/payment-options')}
            sx={{ flex: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleFinish}
            sx={{ 
              flex: 1,
              background: 'linear-gradient(45deg, #1976d2, #2196f3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
              }
            }}
          >
            Finish
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Step 5 of 5
        </Typography>
      </Paper>
    </Container>
  );
};

export default Confirmation; 
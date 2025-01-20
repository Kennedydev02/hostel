import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward, Home, AccessTime, CheckCircle } from '@mui/icons-material';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const MotionPaper = motion(Paper);
  const MotionTypography = motion(Typography);
  const MotionBox = motion(Box);

  const handleStartCheckIn = () => {
    navigate('personal-details');
  };

  const features = [
    {
      icon: <AccessTime sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      title: 'Quick Process',
      description: 'Complete check-in in under 2 minutes'
    },
    {
      icon: <Home sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      title: 'Comfortable Stay',
      description: 'Modern amenities and cozy environment'
    },
    {
      icon: <CheckCircle sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation'
    }
  ];

  return (
    <Container maxWidth="md">
      <MotionPaper
        elevation={3}
        sx={{
          p: { xs: 3, md: 6 },
          mt: 4,
          borderRadius: '24px',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${theme.palette.primary.light}15, ${theme.palette.primary.main}15)`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${theme.palette.secondary.light}15, ${theme.palette.secondary.main}15)`,
            zIndex: 0,
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <MotionTypography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #2196f3)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome Home
          </MotionTypography>

          <MotionTypography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ 
              mb: 6,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Complete your check-in process in just a few simple steps
          </MotionTypography>

          {/* Features Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gap: 4,
              mb: 6,
            }}
          >
            {features.map((feature, index) => (
              <MotionBox
                key={feature.title}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: 'grey.100',
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{ mt: 2, mb: 1, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {feature.description}
                </Typography>
              </MotionBox>
            ))}
          </Box>

          {/* CTA Button */}
          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={handleStartCheckIn}
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                  boxShadow: '0 8px 20px rgba(33, 150, 243, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(33, 150, 243, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Check-In
              </Button>
            </motion.div>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              mt: 4, 
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            Step 1 of 5
          </Typography>
        </Box>
      </MotionPaper>
    </Container>
  );
};

export default WelcomeScreen; 
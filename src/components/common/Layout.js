import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();

  const getStepNumber = () => {
    const pathMap = {
      '/welcome': 1,
      '/personal-details': 2,
      '/date-selection': 3,
      '/fee-calculator': 4,
      '/payment-options': 5,
      '/confirmation': 6,
    };
    return pathMap[location.pathname] || 1;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '1.5rem',
            }}
          >
            Check-in System
          </Typography>
          {location.pathname !== '/confirmation' && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                bgcolor: 'grey.100',
                px: 2,
                py: 1,
                borderRadius: '16px',
                fontWeight: 500,
              }}
            >
              Step {getStepNumber()} of 5
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed AppBar */}
      <Container 
        component="main" 
        sx={{ 
          mt: 4, 
          mb: 4, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: `linear-gradient(180deg, ${theme.palette.primary.light}15 0%, transparent 100%)`,
          zIndex: 0,
        }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout; 
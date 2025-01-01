import React from 'react';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// Styled components for consistent styling
const StyledAlert = styled('div')(({ theme, alertType }) => ({
  minWidth: '300px',
  maxWidth: '700px',
  padding: '16px 24px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  background: '#ffffff',
  borderLeft: '4px solid',
  borderLeftColor: alertType === 'registration' ? '#2e7d32' : '#1976d2',
  animation: 'slideDown 0.3s ease-out',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  zIndex: 9999, // Ensure alert appears above other content

  '@keyframes slideDown': {
    from: {
      transform: 'translateY(-20px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },

  '@media (max-width: 600px)': {
    minWidth: '280px',
    margin: '0 16px',
  },
}));

const AlertTitle = styled('div')({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: '#1a1a1a',
  marginBottom: '8px',
});

const AlertContent = styled('div')({
  color: '#505050',
  fontSize: '0.95rem',
  lineHeight: 1.5,
});

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  marginLeft: '8px',
  color: '#831313',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: '#1a1a1a',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export default function RegistrationAlert({
  showRegistrationAlert,
  showCancellationAlert,
  onClose,
  isFromMap = false // New prop to handle different positioning
}) {
  return (
    <Snackbar
      open={showRegistrationAlert || showCancellationAlert}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        position: 'fixed', // Changed to fixed to ensure consistent positioning
        top: '20px !important', // Force top positioning
        left: '50% !important',
        transform: 'translateX(-50%)',
        width: 'auto',
        maxWidth: '90vw',
        zIndex: 9999,
        '& .MuiSnackbar-root': {
          position: 'static',
          top: 'auto',
          left: 'auto',
          transform: 'none',
        },
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          maxWidth: 'none',
        }
      }}
    >
      <StyledAlert alertType={showRegistrationAlert ? 'registration' : 'cancellation'}>
        <div>
          {showRegistrationAlert && (
            <>
              <AlertTitle>תודה על הרשמתך להתנדבות!</AlertTitle>
              <AlertContent>
                כעת כדאי ליצור קשר עם החקלאי לצורך תיאום אחרון לפני הגעה.
              </AlertContent>
            </>
          )}
          {showCancellationAlert && (
            <>
              <AlertTitle>ההרשמה בוטלה בהצלחה!</AlertTitle>
            </>
          )}
        </div>
        <StyledCloseButton
          size="small"
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </StyledCloseButton>
      </StyledAlert>
    </Snackbar>
  );
}
import React, { useEffect } from 'react';
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div 
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}
  >
    <Loader2 
      style={{
        width: '40px',
        height: '40px',
        color: '#3B82F6',
        animation: 'spin 1s linear infinite'
      }}
    />
  </div>
);

const ContextualAlert = ({ isOpen, message, onClose, isError }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get current scroll position
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  return (
    <div 
      style={{
        position: 'absolute',
        top: `${currentScrollPosition + 100}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: '90%',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div 
        style={{
          backgroundColor: isError ? '#FEE2E2' : '#ECFDF5',
          color: isError ? '#991B1B' : '#065F46',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          direction: 'rtl',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 5px',
            fontSize: '1.2rem'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

const AlertSystem = ({ isSubmitting, showAlert, alertMessage, onAlertClose, isError }) => {
  return (
    <>
      {isSubmitting && <LoadingSpinner />}
      <ContextualAlert 
        isOpen={showAlert}
        message={alertMessage}
        onClose={onAlertClose}
        isError={isError}
      />
    </>
  );
};

export default AlertSystem;
import React, { createContext, useContext, useState } from 'react';

const CheckInContext = createContext();

export const useCheckIn = () => {
  const context = useContext(CheckInContext);
  if (!context) {
    throw new Error('useCheckIn must be used within a CheckInProvider');
  }
  return context;
};

export const CheckInProvider = ({ children }) => {
  const [checkInData, setCheckInData] = useState({
    personalDetails: null,
    dates: null,
    fees: {
      numberOfDays: 0,
      subtotal: 0,
      tax: 0,
      totalAmount: 0
    },
    payment: null,
  });

  const updateCheckInData = (step, data) => {
    setCheckInData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  return (
    <CheckInContext.Provider value={{ checkInData, updateCheckInData }}>
      {children}
    </CheckInContext.Provider>
  );
}; 
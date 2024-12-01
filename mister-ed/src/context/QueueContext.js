import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import TriageQueueClient from '../clients/TriageQueueClient';
import Logger from '../logging/Logger';

const logger = new Logger();
const QueueContext = createContext(); // Create a context

export const QueueProvider = ({ children }) => {

  const [queueClient, setQueueClient] = useState(null);
  const [isReady, setIsReady] = useState(false); // Track initialization readiness
  
  useEffect(() => {
    // Load nurse's user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Create a queue client for the nurse's hospital
        const initializedClient = new TriageQueueClient(parsedUser.hospitalID);
        setQueueClient(initializedClient);
        // Delay readiness until queue client is properly initialized
        if (initializedClient) {
          setIsReady(true);
        }
      } catch (error) {
        logger.error(`Error parsing user data for the triage queue`, error);
        throw error;
      }
    }
  }, []);
  
  // Return updated context values
  const contextValue = { queueClient, isReady };
  return <QueueContext.Provider value={contextValue}>{children}</QueueContext.Provider>;
  
};

// Create a custom hook for accessing the context
export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('Queue client is not ready. Ensure you are accessing it after initialization.');
  }
  return context;
};
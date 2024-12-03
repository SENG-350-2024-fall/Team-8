import { useQueue } from '../context/QueueContext';
import Logger from '../logging/Logger';

const logger = new Logger();

const useNextPatient = () => {

  const { queueClient, isReady } = useQueue(); // Access both queueClient and readiness state
  
  const getNextPatient = async () => {
    if (!isReady || !queueClient) {
      console.error('Cannot fetch the next patient: Queue client is not initialized.');
      throw new Error('Queue client is not initialized.');
    }
    try {
      // Pop and return the next triage record ID
      const patientRecord = await queueClient.pop();
      return patientRecord;
    } catch (error) {
      logger.error('Error fetching the next triage record from the queue', error);
      console.error('Failed to get next patient:', error);
      throw error;
    }
  };
  
  return { getNextPatient, isReady, queueClient };
  
};

export default useNextPatient;
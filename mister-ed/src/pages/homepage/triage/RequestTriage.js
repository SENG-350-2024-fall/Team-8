import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../../clients/DatabaseClient';

function RequestTriage() {
	const [hospitals, setHospitals] = useState([]);
	const [selectedHospital, setSelectedHospital] = useState('');
	const [error, setError] = useState('');
  const navigate = useNavigate();
  const [queuePosition, setQueuePosition] = useState(null);
  const [triageRequestDescription, setTriageRequestDescription] = useState();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await DatabaseClient.fetch('hospitals');
        setHospitals(data || []);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setError('Could not load hospitals. Please try again later.');
      }
    };
    
    fetchHospitals();
  }, []);
  
	const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHospital) {
      setError('Please select a hospital.');
      return;
    }
    if (!triageRequestDescription) {
      setError('Please provide a reason.');
      return;
    }
    
    try {
			// Fetch hospital data to get queue count
			const hospitalData = await DatabaseClient.fetch(`hospitals/${selectedHospital}`);
			const currentQueue = hospitalData.queue;
			// Update hospital queue count
			const newQueuePosition = currentQueue + 1;
			await DatabaseClient.update(`hospitals/${selectedHospital}`, { queue: newQueuePosition });
			// Display user's position in queue
			setQueuePosition(newQueuePosition);
		} catch (error) {
			console.error('Error updating queue:', error);
			setError('Could not submit request. Please try again.');
		}
  };
  
  const selectedHospitalDetails = hospitals.find(hospital => hospital.id === selectedHospital);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
        <h1>Request Triage</h1>
        {/* Grid of buttons */}
        <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '600px' }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              style={{ padding: '20px' }}
              onClick={() => navigate('/home')}
            >
              Home Page
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              style={{ padding: '20px' }}
              onClick={() => navigate('/triage')}
            >
              Triage
            </Button>
          </Grid>
        </Grid>
      </div>
      {/* Main content */}
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', marginTop: '50px' }}>
        {queuePosition ? (
          <p>
            You are in the queue for <strong>{selectedHospitalDetails?.name}</strong>.
            Your position in the queue: {queuePosition}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin='normal'>
              {/* Hospital select dropdown */}
              <InputLabel id='hospital-select-label'>
                Hospital
              </InputLabel>
              <Select
                labelId='hospital-select-label'
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                fullWidth
              >
                {hospitals.map((hospital) => (
                  <MenuItem key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Reason text box */}
            <TextField
              label="Reason"
              fullWidth
              multiline
              rows={4}
              margin='normal'
              value={triageRequestDescription}
              onChange={(e) => setTriageRequestDescription(e.target.value)}
            />
            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              color="error"
              style={{ marginTop: '20px', width: '100%' }}
              fullWidth
            >
              Submit Request
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
          </form>
        )}
      </div>
    </div>
  );
}

export default RequestTriage;

import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../clients/DatabaseClient';

function RequestTriage() {
	const [hospitals, setHospitals] = useState([]);
	const [selectedHospital, setSelectedHospital] = useState('');
	const [error, setError] = useState('');
  const navigate = useNavigate();
  const [queuePosition, setQueuePosition] = useState(null);

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

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <h1>Request Triage</h1>
      {queuePosition ? (
				<p>
					You are in the queue for <strong>{selectedHospitalDetails?.name}</strong>.
					Your position in the queue: {queuePosition}
				</p>
      ) : (
				<form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
					<FormControl fullWidth margin='normal' variant='outlined'>
						<InputLabel id='hospital-select-label' shrink>
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
					{error && <p style={{ color: 'red' }}>{error}</p>}{' '}
					<Button
						type="submit"
						variant="contained"
						color="error"
						style={{ marginTop: '20px', width: '100%' }}
					>
						Submit
					</Button>
				</form>
			)}
      {/* Logout Button */}
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout} 
          style={{ padding: '10px 40px' }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
}

export default RequestTriage;

import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../clients/DatabaseClient';

function RequestTriage() {
	const [hospitals, setHospitals] = useState([]);
	const [selectedHospital, setSelectedHospital] = useState('');
	const [error, setError] = useState('');
  const navigate = useNavigate();

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
  
	const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedHospital) {
      setError('Please select a hospital.');
      return;
    }
    // Add logic to handle triage request submission here
    console.log('Selected Hospital:', selectedHospital);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <h1>Request Triage</h1>
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

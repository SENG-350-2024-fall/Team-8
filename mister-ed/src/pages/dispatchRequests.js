import React, { useEffect, useState } from 'react';
import DatabaseClient from '../clients/DatabaseClient';
import { List, ListItem, ListItemText, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DispatchRequests() {
    const [dispatchRequests, setDispatchRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const [requests, patients, hospitals] = await Promise.all([
                    DatabaseClient.fetchDispatchRequests(),
                    DatabaseClient.fetchPatients(),
                    DatabaseClient.fetchHospitals(),
                ]);

                // Enrich requests with patient and hospital data
                const enrichedRequests = requests.map(request => {
                    const patient = patients.find(p => p.id === request.patientID) || {};
                    const hospital = hospitals.find(h => h.id === request.hospitalID) || {};
                    return {
                        ...request,
                        patientName: patient.name || 'Unknown',
                        patientPostal: patient.postal || 'Unknown',
                        hospitalName: hospital.name || 'Unknown',
                    };
                });

                setDispatchRequests(enrichedRequests);
            } catch (err) {
                setError('Failed to load dispatch requests.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleDispatchClick = async (requestId) => {
      try {
          await DatabaseClient.updateDispatchRequest(requestId, 'dispatched');
          // Update local state to reflect the change
          setDispatchRequests(prevRequests =>
              prevRequests.map(request =>
                  request.id === requestId ? { ...request, dispatch: 'dispatched' } : request
              )
          );
          
          // Send an alert and reload the page
          alert('Ambulance dispatched');
          window.location.reload();
      } catch (err) {
          console.error('Failed to update dispatch status:', err);
          // Handle error (e.g., show a message to the user)
      }
  };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Dispatch Requests
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {dispatchRequests.length > 0 ? (
                <Paper style={{ maxHeight: '400px', overflow: 'auto', padding: '10px' }}>
                    <List>
                        {dispatchRequests.map(request => (
                            <ListItem key={request.id} divider>
                                <ListItemText
                                    primary={`${request.patientName}`}
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Description:</strong> {request.description}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Postal:</strong> {request.patientPostal}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Hospital:</strong> {request.hospitalName}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDispatchClick(request.id)}
                                >
                                    Dispatch
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Typography>No dispatch requests available.</Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() =>  navigate('/homeEMT')}
                style={{ marginTop: '20px' }}
            >
                Back
            </Button>
        </div>
    );
}

export default DispatchRequests;






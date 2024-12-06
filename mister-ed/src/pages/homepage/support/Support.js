import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../../clients/DatabaseClient';
import Logger from '../../../logging/Logger';

const LOG = new Logger();

function SupportTicketPage() {
    const [user, setUser] = useState(null);
    const [ticketData, setTicketData] = useState({
        category: '',
        message: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //Grab User information (to store in ticket)
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            setUser(JSON.parse(userData));
            console.log(JSON.parse(userData));
          } catch (error) { 
            LOG.error(`Error parsing user data in Profile Page`, error);
          }
        }
      }, []);

    const categories = [
        'Account Issues',
        'Profile Management',
        'Viewing Patient History',
        'Triage Issues',
        'Booking Appointments',
        'Notifcation Issues',
        'Emergency Dispatch Issues',
        'Location Services',
        'Clinical Support',
        'System Feedback',
        'New Feature Requests',
        'Other'
        // Add additional categories as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData({ ...ticketData, [name]: value });
    };

    // Function to handle going back
    const handleGoBack = () => {
        // Navigate to the Home Page

        if (user.role === 'Admin') {
        navigate('/homeAdmin');
        } else if (user.role === 'Nurse') {
        navigate('/homeNurse');
        } else if (user.role === 'Doctor') {
        navigate('/homeDoctor');
        } else if (user.role === 'EMT') {
        navigate('/homeEMT');
        } else {
        navigate('/homePatient');
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!ticketData.category || !ticketData.message) {
            setError('Please fill in all the fields.');
            return;
        }

        // Setting additional fields
        const ticketSubmission = {
            // Use user-provided data
            Category: ticketData.category,
            Message: ticketData.message,
            User: { id: user.id, name: user.name, email: user.email, role: user.role },
            
            // Auto-generated fields
            Priority: 'Not Set', // Default priority
            Status: 'Open', // Default status for new tickets
            CreateTime: new Date().toISOString(),
            LastUpdateTime: new Date().toISOString(),
            Comments: [], //List of potential comments that the admins adds
        };

        try {
            const response = await DatabaseClient.post('support', ticketSubmission);

            if (response.ok) {
                console.log('New Ticket Added:', ticketSubmission);
                setError('');
                // Redirect to home page after ticket generation
                if (user.role === 'Admin') {
                    navigate('/homeAdmin');
                } else if (user.role === 'Nurse') {
                    navigate('/homeNurse');
                } else if (user.role === 'Doctor') {
                    navigate('/homeDoctor');
                } else if (user.role === 'EMT') {
                    navigate('/homeEMT');
                } else {
                    navigate('/homePatient');
                }
            } else {
                throw new Error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(
                'There was a problem creating the ticket. Please try again.'
            );
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Support Ticket</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={ticketData.category}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Message"
                    name="message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={ticketData.message}
                    onChange={handleChange}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    style={{ marginTop: '20px', width: '100%' }}
                >
                    Submit Ticket
                </Button>
            </form>
            <Button
                variant="contained"
                color="error"
                style={{ marginTop: '20px', width: '100%' }}
                onClick={handleGoBack}
            >
                Return to Home
            </Button>
        </div>
    );
}

export default SupportTicketPage;

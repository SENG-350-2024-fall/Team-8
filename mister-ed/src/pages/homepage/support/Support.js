import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../../clients/DatabaseClient';

function SupportTicketPage() {
    const [ticketData, setTicketData] = useState({
        category: '',
        message: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            UserID: '1', // Replace with actual user ID from system
            Category: ticketData.category,
            Message: ticketData.message,
            
            // Auto-generated fields
            Priority: 'Not Set', // Default priority
            Status: 'Open', // Default status for new tickets
            CreateTime: new Date().toISOString(),
            LastUpdateTime: new Date().toISOString(),
        };

        try {
            const response = await DatabaseClient.post('support', ticketSubmission);

            if (response.ok) {
                console.log('New Ticket Added:', ticketSubmission);
                setError('');
                navigate('/home'); // Redirect to home page after ticket generation
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
                onClick={() => navigate('/home')}
            >
                Return to Home
            </Button>
        </div>
    );
}

export default SupportTicketPage;

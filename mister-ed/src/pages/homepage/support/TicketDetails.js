import React, { useEffect, useState } from 'react';
import { Button, Typography, TextField, Grid, Box, MenuItem, Select, FormControl, InputLabel, List, ListItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DatabaseClient from '../../../clients/DatabaseClient';

function TicketDetailPage() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [comment, setComment] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchTicketDetails();
        }
    }, [id]);

    const fetchTicketDetails = async () => {
        try {
            const data = await DatabaseClient.fetch(`support/${id}`);
            setTicket(data);
            setPriority(data.Priority || 'Not Set'); // Display "Not Set" if it's the current priority
        } catch (error) {
            console.error('Failed to fetch ticket details:', error);
            alert('An error occurred while fetching ticket details.');
        }
    };

    const updateTicketPriority = async (newPriority) => {
        try {
            const updatedFields = {
                Priority: newPriority,
                LastUpdateTime: new Date().toISOString()
            };
            // Use DatabaseClient to update the ticket priority
            await DatabaseClient.patch('support', id,  updatedFields );
            alert('Priority updated successfully.');

            // Refresh the ticket data to reflect the latest LastUpdateTime
            const updatedTicket = await DatabaseClient.fetch(`support/${id}`);
            setTicket(updatedTicket); // Update state with fresh data
        } catch (error) {
            console.error('Failed to update priority:', error);
            alert('An error occurred while updating the priority.');
        }
    };

    const handlePriorityChange = (event) => {
        const newPriority = event.target.value;
        setPriority(newPriority);
        updateTicketPriority(newPriority);
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) {  // Check if the comment is empty or just whitespace
            setError('Please type in a comment'); // Set the error message
            return;
        }

        setError('');
        console.log('Submitting comment:', { ticketId: id, comment });
        try {
            const updatedFields = {
                comment,
                LastUpdateTime: new Date().toISOString()
            };
            await DatabaseClient.updateTicket(`support`, id, updatedFields );
            alert('Comment added successfully.');
            setComment('');
            fetchTicketDetails();
        } catch (error) {
            console.error('Failed to submit comment:', error);
            alert('An error occurred while submitting your comment.');
        }
    };

    const handleBack = () => {
        navigate('/support-admin');
    };

    if (!ticket) return <div>Loading...</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom> Ticket Details </Typography>

            <Grid container spacing={0} alignItems="center" sx={{ textAlign: 'left', width: '100%', marginBottom: '20px' }}>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Ticket ID:</strong> {ticket.id}</Typography>
                    <Typography variant="body1"><strong>Status:</strong> {ticket.Status}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={priority}
                            onChange={handlePriorityChange}
                            label="Priority"
                        >
                            {priority === 'Not Set' && (
                                <MenuItem value="Not Set">Not Set</MenuItem>
                            )}
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'left', width: '100%', marginBottom: '20px' }}>
                <Typography variant="body1"><strong>Name:</strong> {ticket.User.name || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {ticket.User.email || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Role:</strong> {ticket.User.role || 'N/A'}</Typography>
            </Box>

            <Box sx={{ textAlign: 'left', width: '100%', marginBottom: '20px' }}>
                <Typography variant="body1"><strong>Message:</strong> {ticket.Message}</Typography>
                <Typography variant="body1"><strong>Created:</strong> {new Date(ticket.CreateTime).toLocaleString()}</Typography>
                <Typography variant="body1"><strong>Last Updated:</strong> {new Date(ticket.LastUpdateTime).toLocaleString()}</Typography>
            </Box>

            <TextField
                label="Add Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
            />

            {error && (
                <Typography variant="body2" color="error" sx={{ marginTop: '8px' }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ textAlign: 'left', width: '100%', marginBottom: '20px' }}>
                <Typography variant="body1"><strong>Comments:</strong></Typography>
                <List>
                    {ticket.Comments && ticket.Comments.map((commentObj, index) => (
                        <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="body2">{commentObj.text}</Typography>
                            <Box sx={{ marginTop: '4px' }}>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(commentObj.timestamp).toLocaleString()}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '20px', maxWidth: '100%' }}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        style={{ padding: '10px' }}
                        onClick={handleBack}
                    >
                        Back to Support
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        style={{ padding: '10px' }}
                        onClick={handleCommentSubmit}
                    >
                        Submit Comment
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TicketDetailPage;

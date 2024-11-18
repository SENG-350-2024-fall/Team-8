import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../../clients/DatabaseClient';

function AdminDashboard() {
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState({ status: '', priority: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await DatabaseClient.fetch('support'); // Fetch all tickets
                setTickets(data);
            } catch (error) {
                console.error('Failed to fetch tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredTickets = tickets.filter(ticket => {
        const statusMatch = !filters.status || ticket.Status.toLowerCase() === filters.status.toLowerCase();
        const priorityMatch = !filters.priority || ticket.Priority.toLowerCase() === filters.priority.toLowerCase();
        return statusMatch && priorityMatch;
    });

    //Function to view more details of the ticket
    const handleTicketClick = (id) => {
        console.log("Ticket ID:", id); // Should show a valid ID
        navigate(`/ticket-details/${id}`); // Assuming you have a ticket detail route
    };

    const changeStatus = async (id) => {
        if (window.confirm('Are you sure you want to mark this ticket as complete?')) {
            try {
                const updatedFields = {
                    Status: 'Complete',
                    LastUpdateTime: new Date().toISOString()
                };
                // Use DatabaseClient to update the ticket status
                await DatabaseClient.patch('support', id, updatedFields);
                
                // Update ticket state after marking as complete
                setTickets(prevTickets =>
                    prevTickets.map(ticket =>
                        ticket.id === id ? { ...ticket, Status: 'Complete' } : ticket
                    )
                );

                alert('Ticket marked as complete.');
            } catch (error) {
                console.error('Failed to update ticket status:', error);
                alert('An error occurred while updating the ticket status.');
            }
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <Typography variant="h4">Admin Dashboard</Typography>
            <TextField
                name="status"
                label="Filter by Status"
                value={filters.status}
                onChange={handleFilterChange}
            />
            <TextField
                name="priority"
                label="Filter by Priority"
                value={filters.priority}
                onChange={handleFilterChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell>{ticket.id}</TableCell>
                                <TableCell>{ticket.User.name}</TableCell>
                                <TableCell>{ticket.Status}</TableCell>
                                <TableCell>{ticket.Priority}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleTicketClick(ticket.id)}>View</Button>
                                    {ticket.Status !== 'Complete' && (
                                        <Button onClick={() => changeStatus(ticket.id)}>Complete</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => navigate('/home')}
                >
                    Return To Home
                </Button>
            </div>
        </div>
        
    );
}

export default AdminDashboard;

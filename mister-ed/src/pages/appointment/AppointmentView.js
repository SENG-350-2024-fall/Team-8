import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, List, ListItem, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../clients/DatabaseClient';
import Logger from '../../logging/Logger';

const LOG = new Logger();

function AppointmentsCalendar() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailyAppointments, setDailyAppointments] = useState([]);
    const [user, setUser] = useState(null); // Store the logged-in user
    const navigate = useNavigate();

    // Fetch the user from localStorage (or context/redux) as done in Profile page
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                console.log(parsedUser);
            } catch (error) {
                LOG.error('Error parsing user data in AppointmentsCalendar', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointmentsData, patientsData, doctorsData] = await Promise.all([
                    DatabaseClient.fetch('appointments'),
                    DatabaseClient.fetch('patients'),
                    DatabaseClient.fetch('doctors')
                ]);

                setAppointments(appointmentsData);
                setPatients(patientsData);
                setDoctors(doctorsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!user) return; // If user is not available, skip filtering

        const enrichedAppointments = appointments.map(appointment => {
            const patient = patients.find(p => p.id === appointment.patientID);
            const doctor = doctors.find(d => d.id === appointment.doctorID);

            return {
                ...appointment,
                patientName: patient ? patient.name : 'Unknown Patient',
                doctorName: doctor ? doctor.name : 'Unknown Doctor'
            };
        });

        // Filter appointments based on user role and ID
        let filteredAppointments = [];
        if (user.role === 'Nurse') {
            filteredAppointments = enrichedAppointments; // Nurse sees all appointments
        } else if (user.role === 'Doctor') {
            filteredAppointments = enrichedAppointments.filter(appointment => appointment.doctorID === user.id); // Doctor sees their own appointments
        } else if (user.role === 'Patient') {
            filteredAppointments = enrichedAppointments.filter(appointment => appointment.patientID === user.id); // Patient sees their own appointments
        }

        // Filter appointments by selected date
        const filteredByDate = filteredAppointments.filter(appointment => {
            const appointmentDate = new Date(appointment.time).toDateString();
            return appointmentDate === selectedDate.toDateString();
        });

        // Sort appointments by time
        const sortedAppointments = filteredByDate.sort((a, b) => new Date(a.time) - new Date(b.time));

        setDailyAppointments(sortedAppointments);
    }, [appointments, patients, doctors, selectedDate, user]);

    return (
        <div>
            <h1>Appointments</h1>
            <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
            </Box>
            <Typography variant="h6" style={{ marginTop: '20px' }} align="center">
                Appointments for {selectedDate.toDateString()}:
            </Typography>
            {dailyAppointments.length === 0 ? (
                <Typography align="center">No appointments for this day.</Typography>
            ) : (
                <Box sx={{ px: 5 }}>
                    <List>
                        {dailyAppointments.map((appointment) => (
                            <ListItem key={appointment.id} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                    {new Date(appointment.time).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })} - {appointment.patientName} (Doctor: {appointment.doctorName})
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: '14px', marginTop: '4px' }}>
                                    Notes: {appointment.notes}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
            <Box style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => navigate('/home')} // Adjust path as per your homepage route
                >
                    Homepage
                </Button>
            </Box>
        </div>
    );
}

export default AppointmentsCalendar;

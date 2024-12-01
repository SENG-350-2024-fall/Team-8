import React, { useState, useEffect } from 'react';
import {
    Button,
    Input,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    TextField,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../clients/DatabaseClient';
import Appointment from './Appointment';
import Logger from '../../logging/Logger';

const LOG = new Logger();

const handleSubmit = async (e) => {};

function BookAppointment() {
    const [open, setOpen] = useState(true);
    const [error, setError] = useState('');
    const [appointmentNotes, setAppointmentNotes] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await DatabaseClient.fetch('doctors');
                setDoctors(data || []);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setError('Could not load doctors. Please try again later.');
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await DatabaseClient.fetch('patients');
                setPatients(data || []);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setError('Could not load patients. Please try again later.');
            }
        };
        fetchPatients();
    }, []);

    const handleAppointment = async (e) => {
        e.preventDefault();
        const req_fields = [
            { value: selectedPatient, label: 'Patient' },
            { value: selectedDoctor, label: 'Doctor' },
            { value: selectedDay, label: 'Date' },
            { value: selectedTime, label: 'Time' },
        ];
        const missing_fields = req_fields
            .filter((field) => field.value.trim() === '')
            .map((field) => field.label);
        if (missing_fields.length > 0) {
            setError(`Missing required fields: ${missing_fields.join(', ')}`);
            return;
        }
        const dateTimeString = `${selectedDay}T${selectedTime}:00`;
        const appointment = new Appointment(
            selectedPatient,
            selectedDoctor,
            dateTimeString,
            appointmentNotes
        );
        try {
            await DatabaseClient.post('appointments', appointment);
        } catch (err) {
            LOG.error('Error making database call', err);
            setError('Failed to submit appointment; please try again.');
        }
        setOpen(false);
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '0 auto',
                textAlign: 'center',
                marginTop: '50px',
            }}
        >
            {!open ? (
                <div>
                    <h2>Appointment Submitted!</h2>
                </div>
            ) : (
                <form onSubmit={handleAppointment}>
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'space-between',
                            margin: 'auto',
                        }}
                    >
                        <div>
                            <InputLabel>Date</InputLabel>
                            <Input
                                id='appointment-day'
                                type='date'
                                min={new Date().toISOString().split('T')[0]}
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                            />
                        </div>
                        <div>
                            <InputLabel>Time</InputLabel>
                            <Input
                                id='appointment-time'
                                type='time'
                                step='3600'
                                value={selectedTime}
                                onChange={(e) =>
                                    setSelectedTime(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center',
                            margin: '10px',
                        }}
                    >
                        <div>
                            <InputLabel>Doctor</InputLabel>
                            <Select
                                style={{ width: '200px' }}
                                placeholder='Select Doctor...'
                                labelId='doctor-select-label'
                                value={selectedDoctor}
                                onChange={(e) =>
                                    setSelectedDoctor(e.target.value)
                                }
                                fullWidth
                            >
                                {doctors.map((doctor) => (
                                    <MenuItem key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <InputLabel>Patient</InputLabel>
                            <Select
                                style={{ width: '200px' }}
                                placeholder='Select Patient...'
                                labelId='patient-select-label'
                                value={selectedPatient}
                                onChange={(e) =>
                                    setSelectedPatient(e.target.value)
                                }
                                fullWidth
                            >
                                {patients.map((patient) => (
                                    <MenuItem
                                        key={patient.id}
                                        value={patient.id}
                                    >
                                        {patient.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {/* Notes text box */}
                    <TextField
                        label='Notes'
                        fullWidth
                        multiline
                        rows={4}
                        margin='normal'
                        value={appointmentNotes}
                        onChange={(e) => setAppointmentNotes(e.target.value)}
                    />
                    {/* Submit button */}
                    <Button
                        type='submit'
                        variant='contained'
                        color='error'
                        style={{ marginTop: '20px', width: '100%' }}
                        fullWidth
                    >
                        Create Appointment
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
                </form>
            )}
        </div>
    );
}
export default BookAppointment;

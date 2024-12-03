import React, { useState, useEffect } from 'react';
import {
    Button,
    TextareaAutosize,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../../clients/DatabaseClient';
import TriageQueueClient from '../../../clients/TriageQueueClient';
import Logger from '../../../logging/Logger';
import useNextPatient from '../../../hooks/useNextPatient';
import BookAppointment from '../../appointment/BookAppointment';

const LOG = new Logger();

function PerformTriage() {
    // State to manage the display of the form
    const [outcome, setOutcome] = useState('');
    const [triageRecord, setTriageRecord] = useState(null);
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);
    const { getNextPatient, isReady } = useNextPatient(); // Access queueClient readiness (it takes time to load nurse's ID and find the corresponding hospital queue)
    const [user, setUser] = useState(null);
    const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);

    // Load user data from localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                LOG.error(
                    `Error parsing user data in Request Triage Page`,
                    error
                );
            }
        }
    }, []);

    // Function to handle the "Get Next" button click
    const handleGetNext = async () => {
        // Clear any previous errors
        setError('');
        // Wait until nurse's ID is retrieved and corresponding hospital queue is found
        if (!isReady) {
            console.warn('Queue client is not ready yet. Please wait.');
            return;
        }
        try {
            // Get next triage record ID from the queue
            const recordID = await getNextPatient();
            // Find the triage record that matches this ID
            const records = await DatabaseClient.fetch('triage_records');
            const foundRecord = records?.find(
                (record) => String(record.id) === String(recordID)
            );
            if (foundRecord) setTriageRecord(foundRecord);
            // Find the patient of this triage record
            LOG.info(
                `Attempting to retrieve patient of id: ${foundRecord.patientID}`
            );
            const patients = await DatabaseClient.fetch('patients');
            const foundPatient = patients?.find(
                (patient) =>
                    String(patient.id) === String(foundRecord.patientID)
            );
            if (foundPatient) setPatient(foundPatient);
        } catch (err) {
            // Handle errors differently as needed (for debugging and displaying specific error messages to user)
            if (err.message.includes('Queue is empty')) {
                setError('Queue is empty.');
                LOG.error('Queue is empty', err);
            } else {
                console.error(err);
                setError('Could not fetch the next patient.');
                LOG.error('Could not fetch the next patient', err);
            }
        }
    };

    // Function to handle form action button clicks
    const handleAction = async () => {
        // Add the outcome to the triage record
        const record = triageRecord;
        record.outcome = outcome;

        // Add the nurseID to the triage record
        record.nurseID = user.id;

        //update it in the database
        await DatabaseClient.updateRecord('triage_records', record);

        // Reset the state to the default view
        setTriageRecord(null);
        setPatient(null);
        setOutcome('');
    };

    function handleAppointment() {
        const appointment_form = document.getElementById('appointment-form');
        setIsAppointmentVisible(!isAppointmentVisible);
        isAppointmentVisible
            ? (appointment_form.style.display = 'block')
            : (appointment_form.style.display = 'none');
    }

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            {!triageRecord ? (
                <Button
                    onClick={handleGetNext}
                    type='submit'
                    variant='contained'
                    style={{ marginTop: '20px', width: '100%' }}
                >
                    Get Next Triage Patient
                </Button>
            ) : (
                <div>
                    <form>
                        <h3>Details</h3>
                        <p>
                            <strong>Patient: </strong>
                            {patient ? patient.name : 'Loading...'}
                        </p>
                        <p>
                            <strong>Message: </strong>{' '}
                            {triageRecord.description}
                        </p>
                    </form>
                    <TextareaAutosize
                        aria-label='minimum height'
                        minRows={3}
                        placeholder='Type your message here...'
                        value={outcome}
                        onChange={(e) => setOutcome(e.target.value)}
                        rows='4'
                        style={{ width: '100%', margin: '10px 0' }}
                    />
                    <div id='appointment-form' style={{ display: 'none' }}>
                        <BookAppointment></BookAppointment>
                    </div>
                    <div>
                        <Button
                            onClick={handleAction}
                            type='submit'
                            variant='contained'
                            style={{ margin: '20px' }}
                        >
                            Submit Response
                        </Button>
                        <Button
                            onClick={handleAppointment}
                            type='submit'
                            variant='contained'
                            style={{ margin: '20px' }}
                        >
                            Book Appointment
                        </Button>
                        <Button
                            onClick={handleAction}
                            type='submit'
                            variant='contained'
                            style={{ margin: '20px' }}
                            color='error'
                        >
                            Call Ambulance
                        </Button>
                    </div>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PerformTriage;

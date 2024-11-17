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

const LOG = new Logger();

function PerformTriage() {
    // State to manage the display of the form
    const [outcome, setOutcome] = useState('');
    const [triageRecord, setTriageRecord] = useState(null);
    const [patient, setPatient] = useState(null);

    // Function to handle the "Get Next" button click
    const handleGetNext = async () => {
        //get next form ID from queue
        try {
            let recordID;

            try {
                recordID = await TriageQueueClient.pop();
            } catch (err) {
                //output an error message onto the page
                LOG.error('Error popping from triage queue', err);
                return;
            }

            //if queue is empty...
            if (recordID == undefined) {
                //display a queue is empty message onto the page and exit
                return;
            }

            LOG.info(`Attempting to retrieve triage record of id: ${recordID}`);

            const records = await DatabaseClient.fetch('triage_records');

            //if the id was retrieved from the database, setShowForm to true
            const record = records?.find(
                (record) => record.id === recordID.toString()
            );
            if (record) {
                setTriageRecord(record);

                LOG.info(
                    `Attempting to retrieve patient of id: ${record.patientID}`
                );
                const patients = await DatabaseClient.fetch('patients');
                const curPatient = patients?.find(
                    (patient) => String(patient.id) === String(record.patientID)
                );
                if (curPatient) {
                    setPatient(curPatient);
                }
            } else {
                LOG.error(
                    `Trouble accessing triage request from queue with id: ${recordID}`
                );
            }
        } catch (err) {
            LOG.error('Something went wrong!', err);
            console.error(err);
        }
    };

    // Function to handle form action button clicks
    const handleAction = async () => {
        // Add the outcome to the triage record
        const record = triageRecord;
        record.outcome = outcome;

        //TODO: add nurse ID to the record as well

        //update it in the database
        await DatabaseClient.updateRecord('triage_records', record);

        // Reset the state to the default view
        setTriageRecord(null);
        setPatient(null);
        setOutcome('');
    };

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
                            onClick={handleAction}
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
        </div>
    );
}

export default PerformTriage;

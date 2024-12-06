import React, {useEffect, useState } from 'react';
import { Button, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logger from '../../../logging/Logger';
import DatabaseClient from '../../../clients/DatabaseClient'

const logger = new Logger();

function Triage() {
  const [user, setUser] = useState(null);
  const [triageRecords, setTriageRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [nurseName, setNurseName] = useState(null);
  const [hospitalName, setHospitalName] = useState(null);
  const navigate = useNavigate();
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchTriageRecords(parsedUser.id); // Use parsedUser.id directly to avoid relying on delayed state update and prevent race condition
      } catch (error) {
        logger.error(`Error parsing user data in Triage Page`, error);
      }
    }
  }, []);
  
  const fetchTriageRecords = async (patientID) => {
    try {
      const data = await DatabaseClient.fetch('triage_records');
      // Filter records for those that match the patient's ID and contain results (i.e., outcome is not empty)
      const patientRecords = data
        .filter(record => record.patientID === patientID && record.outcome) /* Remove "&& record.outcome" to get all records */
        .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)); /* Order the records with the most recent date first */
      setTriageRecords(patientRecords);
      if (patientRecords.length > 0) setSelectedRecord(patientRecords[0]); // Set the latest record as the initially selected record
    } catch (error) {
      logger.info('No matching triage records found');
    }
  };
  
  const getNurseName = async (nurseID) => {
    if (!nurseID) {
      setNurseName("Unknown");
      return;
    }
    try {
      const data = await DatabaseClient.fetch('nurses');
      const foundNurse = data?.find((nurse) => nurse.id === nurseID);
      setNurseName(foundNurse ? foundNurse.name : "Unknown");
    } catch (error) {
      logger.info('Failure fetching data');
      console.error('Error fetching data:', error);
      setNurseName("Unknown");
    }
  };
  
  const getHospitalName = async (hospitalID) => {
    if (!hospitalID) {
      setHospitalName("Unknown");
      return;
    }
    try {
      const data = await DatabaseClient.fetch('hospitals');
      const foundHospital = data?.find((hospital) => hospital.id === hospitalID);
      setHospitalName(foundHospital ? foundHospital.name : "Unknown");
    } catch (error) {
      logger.info('Failure fetching data');
      console.error('Error fetching data:', error);
      setHospitalName("Unknown");
    }
  };
  
  useEffect(() => {
    if (selectedRecord) {
      getNurseName(selectedRecord.nurseID);
      getHospitalName(selectedRecord.hospitalID);
    }
  }, [selectedRecord]); // Trigger when selectedRecord changes
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
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

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
        <h1>Triage</h1>
        
        {/* Grid of buttons */}
        <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '600px' }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              style={{ padding: '20px' }}
              onClick={handleGoBack}
            >
              Home Page
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              style={{ padding: '20px' }}
              onClick={() => navigate('/perform-triage')}
            >
              Perform Triage
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              style={{ padding: '20px' }}
              onClick={() => navigate('/request-triage')}
            >
              Request Triage
            </Button>
          </Grid>
        </Grid>
      </div>
        
      {/* Message */}
      {triageRecords.length > 0 ? (
        showInitialMessage && (
          <div style={{ textAlign: 'center', margin: '0 auto', marginTop: '50px'}}>
            Below are the results from your last triage. Alternatively, you may view results from any of your past triages.
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', margin: '0 auto', marginTop: '50px'}}>
          You have no triage results to display. Your results from all future triages will be available here.
        </div>
      )}
        
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', marginTop: '50px' }}>
        
        {/* Dropdown to select record */}
        {triageRecords.length > 0 && (
          <FormControl fullWidth margin='normal'>
            <InputLabel id='record-select-label'>
              Triage Record
            </InputLabel>
            <Select
              labelId='record-select-label'
              value={selectedRecord?.id || ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const record = triageRecords.find((rec) => rec.id === selectedId);
                setSelectedRecord(record);
                getNurseName(record.nurseID);
                // Hide the initial message once the selected record is different from the initially selected record (i.e., the latest)
                if (record.id != triageRecords[0].id) setShowInitialMessage(false);
              }}
              fullWidth
            >
              {triageRecords.map((record) => (
                <MenuItem key={record.id} value={record.id}>
                  {formatDate(record.lastModified)} - {record.description}
                </MenuItem>
              ))}
            </Select>
            
            {/* Display details for selected record */}
            {selectedRecord && (
              <div style={{ marginTop: '50px', textAlign: 'left' }}>
                <div><strong>Date:</strong> {formatDate(selectedRecord.lastModified)}</div>
                <div><strong>Hospital:</strong> {hospitalName}</div>
                <div><strong>Description:</strong> {selectedRecord.description}</div>
                <div><strong>Outcome:</strong> {selectedRecord.outcome}</div>
                <div><strong>Nurse:</strong> {nurseName}</div>
              </div>
            )}
            
          </FormControl>
        )}
      </div>
    </div>
  );
}

export default Triage;

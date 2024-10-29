import React, { useState } from 'react';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DatabaseClient from '../clients/DatabaseClient';
import Logger from '../logging/Logger';

const LOG = new Logger();

function Login() {
    const [accountType, setAccountType] = useState('Patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Define the endpoint based on the selected account type
        let endpoint;
        if (accountType === 'Patient') {
            endpoint = 'patients';
        } else if (accountType === 'Nurse') {
            endpoint = 'nurses';
        } else if (accountType === 'EMT') {
            endpoint = 'emts';
        } else if (accountType === 'Doctor') {
            endpoint = 'doctors';
        } else if (accountType === 'Admin') {
            endpoint = 'admins';
        }

        try {
            const data = await DatabaseClient.fetch(endpoint);
            const foundUser = data?.find(
                (user) => user.email === email && user.password === password
            );

            if (foundUser) {
                LOG.info(data);
                setError('');
                navigate('/home'); // Redirect to landing page upon successful login
            } else {
                LOG.info('Failed Login');
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            LOG.info('failure fetching data');
            console.error('Error fetching data:', error);
            setError('There was an error processing your request.');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: '400px', margin: '0 auto' }}
            >
                <FormControl fullWidth margin='normal' variant='outlined'>
                    <InputLabel id='account-type-label' shrink>
                        Account Type
                    </InputLabel>
                    <Select
                        labelId='account-type-label'
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value='Patient'>Patient</MenuItem>
                        <MenuItem value='Nurse'>Nurse</MenuItem>
                        <MenuItem value='EMT'>EMT</MenuItem>
                        <MenuItem value='Doctor'>Doctor</MenuItem>
                        <MenuItem value='Admin'>Admin</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
                {/* Show error message if any */}
                <Button
                    type='submit'
                    variant='contained'
                    color='error'
                    style={{ marginTop: '20px', width: '100%' }}
                >
                    Submit
                </Button>
            </form>
            <Link
                to='/landing'
                style={{
                    textDecoration: 'none',
                    width: '100%',
                    display: 'block',
                }}
            >
                <Button
                    variant='contained'
                    color='error'
                    style={{ marginTop: '20px', width: '400px' }} // Matching width for Back to Landing button
                >
                    Back to Landing
                </Button>
            </Link>
        </div>
    );
}

export default Login;

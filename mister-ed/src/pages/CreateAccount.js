import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_PATIENTS } from './sampledb';  // Import your sample data

function CreateAccount() {
  const [newAccount, setNewAccount] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    age: '',
    postal: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to ensure fields are filled in
    if (!newAccount.email || !newAccount.password || !newAccount.name || !newAccount.age || !newAccount.postal) {
      setError('Please fill in all the fields.');
      return;
    }

    // Assign a new ID
    const newId = (SAMPLE_PATIENTS.length + 1).toString();
    const accountToAdd = { ...newAccount, id: newId };

    // Simulate adding the account to the SAMPLE_PATIENTS array
    SAMPLE_PATIENTS.push(accountToAdd);
    console.log('New account added:', accountToAdd);

    // Redirect to login page after account creation
    navigate('/login');
  };

  const handleReturnToLanding = () => {
    navigate('/');
  };


  return (
    <div>
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newAccount.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newAccount.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newAccount.password}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newAccount.age}
          onChange={handleChange}
        />
        <TextField
          label="Postal Code"
          name="postal"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newAccount.postal}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message if any */}
        <Button 
          type="submit" 
          variant="contained" 
          color="error" 
          style={{ marginTop: '20px', width: '100%' }}
        >
          Create Account
        </Button>
      </form>
      <Button 
        variant="contained" 
        color="error" 
        style={{ marginTop: '20px', width: '400px' }}  // Fixed button width
        onClick={handleReturnToLanding}
      >
        Return to Landing
      </Button>
    </div>
  );
}

export default CreateAccount;

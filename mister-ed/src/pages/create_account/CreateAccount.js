import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../clients/DatabaseClient';
import UserFactory from '../../users/UserFactory';
import RequiredFieldsValidation from './validation_handler/RequiredFieldsValidation';
import EmailFormatValidation from './validation_handler/EmailFormatValidation';
import PasswordStrengthValidation from './validation_handler/PasswordStrengthValidation';
import NameFormatValidation from './validation_handler/NameFormatValidation';
import AgeValidation from './validation_handler/AgeValidation';
import PostalFormatValidation from './validation_handler/PostalFormatValidation';
import ValidationError from './validation_handler/ValidationError';
import Logger from '../../logging/Logger';

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

  //Set up the Logger to track Warnings and Errors
  const logger = new Logger('info');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Chain of Responsibility, Validation Checker
    const requiredFieldsValidation = new RequiredFieldsValidation();
    const emailFormatValidation = new EmailFormatValidation();
    const passwordStrengthValidation = new PasswordStrengthValidation();
    const nameFormatValidation = new NameFormatValidation();
    const ageValidation = new AgeValidation();
    const postalFormatValidation = new PostalFormatValidation();

    // Set up the validation chain
    requiredFieldsValidation
      .setNext(nameFormatValidation)
      .setNext(emailFormatValidation)
      .setNext(passwordStrengthValidation)
      .setNext(ageValidation)
      .setNext(postalFormatValidation);

    try {
      //Pass Account Data through the Validation chain (starts with requiredFieldsValidation)
      requiredFieldsValidation.handle(newAccount);

      //Call UserFactory to create the user object based on the role
      const user = UserFactory.createUser('Patient', newAccount.name, newAccount.email, newAccount.password, newAccount.age, newAccount.postal);

      const { id, ...accountData } = newAccount; // Exclude 'id' so json-server can auto-generate it for simplicity
      const response = await DatabaseClient.post('patients', accountData);

      if (response.ok) {
        console.log('New account added:', newAccount);
        console.log('User Created: ', user);
        logger.info(`User created: ${JSON.stringify({
          name: user.name,
          email: user.email,
          age: user.age,
          postal: user.postal,
          permissions: user.permissions,
        })}`); // Logging the new user created (excluding password)
        setError('');
        navigate('/login'); // Redirect to login page after account creation
      } else {
        throw new Error('Failed to create account');
      }
    } catch (error) {
      //Display Error message 
      if (error instanceof ValidationError) { //Only print Validation Handler Errors
        setError(error.message);
      } else { //Print Default Error Message
        setError('There was a problem creating the account. Please try again.');
        logger.error('Account creation failed', error); //Logging some backend error
      }

      console.error('Error:', error);
      
    }
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

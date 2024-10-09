import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Welcome to Mister Ed</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

export default Landing;
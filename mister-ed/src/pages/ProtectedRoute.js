import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute ({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            // Navigate to the login page as a cue that the user needs to sign in before viewing the page
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    if (isLoading) {
        return null;
    }

    // Otherwise, user exists, so render the children (the page)
    return children;
};

export default ProtectedRoute;

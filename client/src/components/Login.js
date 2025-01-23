import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';


// Function that will handle the login functionality
function Login() {
    // useState to set the form data, initially as a blank string
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    // set message and error message initially as blank strings
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // Handle change in input, create a new object that set the given name to the corresponding value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };
    // Handle submitting the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // Wait until we fetch the data from the backend
            const response = await axios.post('/login', formData);
            // Set the message to the response code from the backend
            setMessage(response.data.message);
            console.log('logged in user: ', response.data.user);
        } catch (err) {
            // If we have an error, set the corresponding error message
            if (err.response) {
                setError(err.response.data.error || 'Login failed. Please try again.');
            } else if (err.request) {
                setError('No response from the server. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }

            console.log('Login error:', err);
        }
    };

  return (
    <div className='login-page'>

        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className='form-group'>
                <label htmlFor="identifier">Username or Email</label>
                <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    placeholder="Enter your username or email"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                
                />

            </div>

            <div className="form-group">

                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="login-button">Login</button>
        </form>
    </div>
    
  );
}

export default Login;
import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
// For page redirection
import { useNavigate } from 'react-router-dom';


// Function that will handle the login functionality
function Login() {
    // useState to set the form data, initially as a blank string
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    // set message and error message initially as blank strings
    //const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Hook for navigation
    const navigate = useNavigate();
    // Handle change in input, create a new object that set the given name to the corresponding value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    // Handle submitting the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log(formData);
            // Wait until we fetch the data from the backend
            const response = await axios.post('http://localhost:5000/login', formData);

            // Get the username
            const { user } = response.data;
            // Store the user's information in LocalStorage
            localStorage.setItem('username', user.username);

            // Set the userId in the localStorage when logging in
            localStorage.setItem('userId', user.id);

            // Store the welcome message so that it can persists in the homepage as long as the user is logged in
            localStorage.setItem('welcomeMessage', `Welcome back, ${user.username}! Continue shopping for some delicious Mexican treats!`);

            // Dispatch event so Navbar updates immediately
            window.dispatchEvent(new Event('storage'));
            // Dispatch event so that CartContext updates immediately
            window.dispatchEvent(new Event('login-successful'));

            // Redirect to the homepage
            navigate('/');
            // Set the message to the response code from the backend
        } catch (err) {
            // If we have an error, set the corresponding error message
            if (err.response) {
                setError(err.response.data.error || 'Login failed. Please try again.');
            } else if (err.request) {
                setError('No response from the server. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

  return (
    <div className='login-page'>
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            
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
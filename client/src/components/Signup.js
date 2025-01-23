import React, {useState} from 'react'
import axios from 'axios';
import './Signup.css';



function Signup() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            setMessage('Successfully signed up!');
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
            });
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Error with signing up, please try again');
            } else if (error.request) {
                setError('No response from the server, please try again');
            } else {
                setError('An error has occurred, please try again');
            }
            console.log('Sign-up error:', error);

        }
    };

  return (
    <div className="signup-page">
        <h1>Sign Up</h1>
        <form className="signup-form">
            <h1>Create Your Account</h1>
            {message && <p className='success-message'>{message}</p>}
            {error && <p className='error-message'>{error}</p>}
            <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder='Enter your first name' value={formData.firstName} onChange={handleChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Please choose a username" value={formData.username} onChange={handleChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder='Enter a secure password' value={formData.password} onChange={handleChange} required/>
            </div>
        

            <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup
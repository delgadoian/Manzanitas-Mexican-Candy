import React from 'react'

import './Signup.css';



function Signup() {
  return (
    <div className="signup-page">
        <h1>Sign Up</h1>
        <form className="signup-form">
            <h1>Create Your Account</h1>
            <p>Please fill in the information below to create your account.</p>
            <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" name="firstName" placeholder='Enter your first name' required/>
            </div>

            <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" name="lastName" placeholder="Enter your last name" required/>
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Please choose a username" required/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder='Enter your email' required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder='Enter a secure password' required/>
            </div>
        

            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup
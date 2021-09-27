import React from 'react'
import './LoginPage.css';
import logo from '../components/logo.png';
import { Link } from 'react-router-dom';

function EmailVerification() {
    return (
        <div className="main-w3layouts wrapper">
            <img src ={logo} className="landingpage-logo" alt="logohere" />
		<h2>Your Everlasting Journey with Make A Note is Going to begin in one step</h2>
        <h2> Go and Hit that Verify button in your mail box, To verify you</h2>
      
		<div className="main-agileinfo">
			<div className="agileits-top">
            
				
                   
				<p>Thankyou for registration, We are happy to have you</p>
                <p><Link to="/login" >Click Here to go to login page</Link> </p>
			</div>
		</div>
        
		
		
		<ul className="colorlib-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
    )
}

export default EmailVerification

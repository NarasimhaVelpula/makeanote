import React from 'react'
import './LoginPage.css';
import logo from '../components/logo.png';
import { Link } from 'react-router-dom';

function PasswordVerification() {
    return (
        <div className="main-w3layouts wrapper">
           <Link to="/"> <img src ={logo} className="landingpage-logo" alt="logohere" /></Link>
		<h2>Being forgotten is a not a bad thing, You will Came to know what is best for you</h2>
        <h2> Go and Hit that Verify button in your mail box, To create new Password</h2>
      
		<div className="main-agileinfo">
			<div className="agileits-top">
            
				
                   
				<p>Always Happy to help you</p>
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

export default PasswordVerification

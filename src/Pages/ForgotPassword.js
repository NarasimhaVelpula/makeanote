import React, { useState } from 'react'
import './LoginPage.css';
import logo from '../components/logo.png';
import { TextField } from '@material-ui/core';
import {useFormik} from 'formik'
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useHistory } from "react-router-dom";

const validate = values => {

    const errors = {};  
 
    if (!values.email) {
 
      errors.email = 'Required';
 
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 
      errors.email = 'Invalid email address';
 
    }
 
  
 
    return errors;
 
  };

function ForgotPassword() {
    const [text,setText]=useState("FindMe")
    const history=useHistory()
    const formik = useFormik({

        initialValues: {
            email: '',
        },
   
        validate,
   
        onSubmit: values => {
          setText("Please Wait...")
          axios.post('auth/forgotPassword',{email:values.email})
          .then((res)=>{
            history.push('/passwordVerification')
          })
          .catch((err)=>{
            if(err.response.status===300){
                history.push('/passwordVerification')
            }
            else{
            alert("email Not found")
            setText("FindMe")
            }
          })
   
        },
   
      });
    return (
        <div className="main-w3layouts wrapper">
            <img src ={logo} className="landingpage-logo" alt="logohrere"/>
		<h1>It's Common to forgot, We are here to help you!</h1>
      
		<div className="main-agileinfo">
			<div className="agileits-top">
            
				<form onSubmit={formik.handleSubmit}>

					<TextField className="text" id="email" name="email" label="email"
                     onChange={formik.handleChange}
                    error={formik.errors.email?true:false}
                    helperText={formik.errors.email}
                     onBlur={formik.handleBlur}
            
                     value={formik.values.email}
                    fullWidth    />
					<br />
				
					<input type="submit" value={text}  />
				</form>
                   
				<p>Do have an Account? <Link to="/login"> Login Now!</Link></p>
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

export default ForgotPassword

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
 
    if (!values.password) {
 
      errors.password = 'Required';
 
    } 
    else if(!/(?=.*[a-z])/i.test(values.password)){
        errors.password="Password must contain one LowerCase"
    }

    else if(!/(?=.*[A-Z])/g.test(values.password)){
        errors.password="Password must contain one UpperCase"
    }

    else if(!/(?=.*\d)/i.test(values.password)){
        errors.password="Password must contain one Numeric"
    }

    else if(!/(?=.*\W)/g.test(values.password)){
        errors.password="Alteast one Special Charachter required"
    }

    else if(values.password.length<8){
        errors.password="Length should atleast 8 charachters long"
    }

    else if (values.password.length > 20) {
 
      errors.password = 'Must be 20 characters or less';
 
    }

    if(!values.confirmPassword){
        errors.confirmPassword="Requried"
    }
    else if(values.password!==values.confirmPassword){
        errors.confirmPassword="Password Didn't Match"
    }
 
  
 
    if (!values.email) {
 
      errors.email = 'Required';
 
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 
      errors.email = 'Invalid email address';
 
    }
 
  
 
    return errors;
 
  };

function RegisterPage() {
    const [text,setText]=useState("SignUp")
    const history=useHistory()
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
   
         
   
        },
   
        validate,
   
        onSubmit: values => {
          setText("Please Wait...")
          axios.post('auth/register',{email:values.email,password:values.password})
          .then((res)=>{
            history.push('/verification')
          })
          .catch((err)=>{
            if(err.response.status===300){
              history.push('/verification')
            }
            else{
            alert("email Already exists")
            setText("SignUp")
            }
          })
   
        },
   
      });
    return (
        <div className="main-w3layouts wrapper">
           <Link to="/"> <img src ={logo} className="landingpage-logo" alt="logohrere"/></Link>
		<h1>Every moment is a fresh Beginning</h1>
      
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
					
					<TextField className="text" id="password" type="password" name="password" label="Password" 
                     onChange={formik.handleChange}

                     onBlur={formik.handleBlur}
                     error={formik.errors.password?true:false}
                     helperText={formik.errors.password}
                     value={formik.values.password}
                     fullWidth />
                    <br />

                    <TextField className="text" id="confirmPassword" type="password" name="confirmPassword"
                    label="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.confirmPassword?true:false}
                     helperText={formik.errors.confirmPassword}
                    value={formik.values.confirmPassword}
                    fullWidth
                    />
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

export default RegisterPage

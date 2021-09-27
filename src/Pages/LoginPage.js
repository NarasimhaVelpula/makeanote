import React, { useState } from 'react'
import './LoginPage.css';
import logo from '../components/logo.png';
import { TextField } from '@material-ui/core';
import {useFormik} from 'formik'
import { Link } from 'react-router-dom';
import axios from '../axios'

import { useHistory } from "react-router-dom";

const validate = values => {

    const errors = {};
 
    if (!values.password) {
 
      errors.password = 'Required';
 
    } else if (values.password.length > 20) {
 
      errors.password = 'Must be 20 characters or less';
 
    }
 
  
 
    if (!values.email) {
 
      errors.email = 'Required';
 
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 
      errors.email = 'Invalid email address';
 
    }
 
  
 
    return errors;
 
  };

function LoginPage() {
    const [loginText,setLoginText]=useState("Login")
    const authToken=localStorage.getItem('auth-token')
    
    const [wrong,setWrong]=useState(false)
    let history = useHistory();
    if(authToken){
      history.push('/dashboard')
    }
    const formik = useFormik({

        initialValues: {
          password: '',
   
          email: '',
   
        },
   
        validate,
   
        onSubmit: values => {
          setLoginText("Please Wait...")
          axios.post('auth/login',{email:values.email,password:values.password})
          .then((res)=>{
              console.log(res.data)
              
              localStorage.setItem('auth-token',res.data.token)
              history.push('/dashboard')
          })
          .catch(err=>{
            if(err.response.status===404)
            {
            console.log(err.response.data)
            setLoginText("Login")
            setWrong(true)
            }
            else{
              history.push('/verification')
            }
          })
   
        },
   
      });
    return (
        <div className="main-w3layouts wrapper">
          <Link to="/">  <img src ={logo} className="landingpage-logo" alt="logohere" /> </Link>
		<h1>Signout of Past, Login into New Beginning</h1>
      
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
                    <br />
        {wrong? <div style={{color:"red",textDecoration:"underline"}}>Wrong Username and Password</div>:<></>}
          <Link to="/forgotPassword">Forgot password?</Link>
					<input type="submit" value={loginText}  />
				</form>
                   
				<p>Don't have an Account? <Link to="/register"> Sign up Now!</Link></p>
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

export default LoginPage
